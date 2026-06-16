import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

/**
 * Generates /robots.txt.
 *
 * Strategy:
 * - General rule: allow all crawlers to access everything.
 * - AI crawlers: explicit allow rules so intent is unambiguous.
 *   PerplexityBot gets a conservative crawlDelay to avoid hammering the server.
 * - Sitemap: canonical no-www domain via SITE_URL constant.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General rule — all other bots
      {
        userAgent: '*',
        allow: '/',
      },
      // OpenAI crawlers
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Google AI crawler
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Anthropic crawlers
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
      },
      // Perplexity — conservative crawl delay to be polite
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        crawlDelay: 2,
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
