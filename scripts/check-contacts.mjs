import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { runInNewContext } from "node:vm"
import ts from "typescript"

function load(file, context) {
  const source = readFileSync(resolve(import.meta.dirname, "..", file), "utf8")
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } })
  const exports = {}
  runInNewContext(outputText, { exports, URL, ...context })
  return exports
}

const env = { NEXT_PUBLIC_WHATSAPP_NUMBER: "5491131876811", NEXT_PUBLIC_CALLS_NUMBER: "541147424688" }
const { config } = load("config.ts", { process: { env } })
assert.equal(config.allNumbers.length, 2)
assert.equal(config.allNumbers[0].href, "https://wa.me/5491131876811")
assert.equal(config.allNumbers[1].href, "tel:+541147424688")
for (const key of Object.keys(env)) {
  for (const invalid of [undefined, "", "+541147424688", "54 11 4742-4688", "0541147424688", "123", "1234567890123456"]) {
    assert.throws(() => load("config.ts", { process: { env: { ...env, [key]: invalid } } }), new RegExp(key))
  }
}

function chat() {
  const states = []
  const timers = new Map()
  const opened = []
  let cleanup
  const react = {
    useState(initial) {
      const index = states.push(initial) - 1
      return [initial, (value) => { states[index] = typeof value === "function" ? value(states[index]) : value }]
    },
    useRef: () => ({ current: undefined }),
    useEffect: (effect) => { cleanup = effect() },
  }
  const { useWhatsAppChat } = load("hooks/use-whatsapp-chat.ts", {
    require: (name) => name === "react" ? react : { config },
    setTimeout: (callback, delay) => { timers.set(delay, callback); return delay },
    clearTimeout: (id) => timers.delete(id),
    window: { open: (...args) => opened.push(args) },
  })
  return { api: useWhatsAppChat(), states, timers, opened, cleanup }
}

const automatic = chat()
assert.equal(automatic.states[0], false)
assert.equal(automatic.timers.has(10000), true)
automatic.timers.get(2000)()
assert.equal(automatic.states[2], true)
automatic.timers.get(10000)()
assert.equal(automatic.states[0], true)
assert.equal(automatic.opened.length, 0)
automatic.api.closeChat()
assert.equal(automatic.states[0], false)

const manual = chat()
manual.api.toggleChat()
assert.equal(manual.states[0], true)
assert.equal(manual.timers.has(10000), false)
manual.api.closeChat()
assert.equal(manual.states[0], false)
manual.api.handleSendMessage()
assert.equal(manual.opened.length, 1)
assert.equal(manual.opened[0][0].startsWith("https://wa.me/5491131876811?text="), true)

const unmounted = chat()
unmounted.cleanup()
assert.equal(unmounted.timers.size, 0)
console.log("Contactos y apertura del chat: OK")
