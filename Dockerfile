# syntax=docker/dockerfile:1

# Bump these in one place to upgrade the base image.
ARG NODE_VERSION=20-alpine

# ---- Base (toolchain shared by deps + builder) ----
FROM node:${NODE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1
# pnpm 10+ es requisito: los overrides viven en pnpm-workspace.yaml, no en package.json.
RUN corepack enable && corepack prepare pnpm@11.3.0 --activate

# ---- Stage 1: Install dependencies ----
FROM base AS deps
WORKDIR /app

# Only el lockfile + manifiestos: esta capa se reutiliza salvo que cambien las deps.
# pnpm-workspace.yaml es obligatorio: contiene los overrides y settings que el
# lockfile registra. Sin él, --frozen-lockfile falla con LOCKFILE_CONFIG_MISMATCH.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Cache mount keeps the pnpm content-addressable store warm across rebuilds.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline

# ---- Stage 2: Build ----
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

# ---- Stage 3: Runner ----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

# Needed by sharp (Next.js image optimization) on Alpine/musl.
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone server (minimal — no full node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets into standalone's expected location
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Runtime env vars — inject via your deployment platform (Railway, Docker run, etc.):
#   BACKEND_URL
#   INTERNAL_API_KEY

CMD ["node", "server.js"]
