#!/usr/bin/env node
// Measures the family's apps the way a phone sees them, over CDP.
//
// A style is not applied because the file says so: the 16px rule and the date
// overflow both looked right in the source and were wrong in
// `getComputedStyle`. This opens every list screen (and the first detail
// screen it links to) at 390px, in both themes, and fails on the two bugs that
// keep coming back with a green build:
//
//   - horizontal overflow: `scrollWidth > clientWidth`, with the deepest
//     elements that stick out — the culprit is rarely the one on the edge;
//   - an input, select or textarea under 16px, which iOS zooms into and never
//     zooms back out of.
//
// It writes a full-page screenshot of every screen for a human to look at.
//
// No dependencies: Node 22's built-in `fetch` and `WebSocket` talk to a
// headless Chrome. Both run in Docker, since the host has neither:
//
//   docker run -d --name cdp --network host --shm-size=1g \
//     --entrypoint /headless-shell/headless-shell chromedp/headless-shell \
//     --no-sandbox --disable-gpu --hide-scrollbars \
//     --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222
//   docker run --rm --network host -v "$PWD":/w -w /w node:22-alpine \
//     node scripts/measure-ui.mjs [app ...] [--width 390] [--out shots]
//   docker rm -f cdp
//
// Exits 1 if any screen fails, so it can gate a kit release.

import { mkdir, writeFile } from "node:fs/promises";

const APPS = {
  invoices: { port: 30100, routes: ["/", "/categorias"], follow: ["/invoices/"] },
  watchlog: { port: 30200, routes: ["/", "/timeline"], follow: ["/titles/"] },
  health: { port: 30300, routes: ["/", "/visits/new"], follow: ["/visits/"] },
  groceries: {
    port: 30400,
    routes: ["/", "/products", "/categories", "/stores"],
    follow: ["/receipts/", "/products/"],
  },
  finance: { port: 30500, routes: ["/", "/plantillas", "/history"], follow: [] },
  expenses: {
    port: 30700,
    routes: ["/", "/gastos", "/resumen", "/categorias"],
    follow: [],
  },
};
const THEMES = ["light", "dark"];

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const [, value] = args.splice(i, 2);
  return value;
};
const width = Number(option("width", "390"));
const out = option("out", "shots");
const cdp = option("cdp", "http://localhost:9222");
const host = option("host", "localhost");
const selected = args.length ? args : Object.keys(APPS);
for (const name of selected) {
  if (!APPS[name]) {
    console.error(`App desconocida: ${name}. Opciones: ${Object.keys(APPS).join(", ")}`);
    process.exit(2);
  }
}

/** One CDP target: send a command, wait for an event. */
async function openTarget() {
  // `PUT`, not `GET`: current Chrome answers 405 to a GET on /json/new.
  const target = await (await fetch(`${cdp}/json/new`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let nextId = 0;
  const pending = new Map();
  const waiters = [];
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id !== undefined) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    } else {
      for (const waiter of waiters.filter((w) => w.method === message.method)) {
        waiters.splice(waiters.indexOf(waiter), 1);
        waiter.resolve(message.params);
      }
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const once = (method, timeout = 15000) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`timeout: ${method}`)), timeout);
      waiters.push({
        method,
        resolve: (value) => {
          clearTimeout(timer);
          resolve(value);
        },
      });
    });
  const close = async () => {
    ws.close();
    await fetch(`${cdp}/json/close/${target.id}`);
  };
  return { send, once, close };
}

async function evaluate(page, expression) {
  const { result, exceptionDetails } = await page.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (exceptionDetails) throw new Error(exceptionDetails.text);
  return result.value;
}

async function navigate(page, url) {
  const loaded = page.once("Page.loadEventFired");
  await page.send("Page.navigate", { url });
  await loaded;
  // The list lands after the load event. Wait for the kit's skeletons to go,
  // or the page would be measured — and photographed — half empty.
  await evaluate(
    page,
    `new Promise((resolve) => {
      const start = Date.now();
      const tick = () =>
        !document.querySelector(".animate-pulse") || Date.now() - start > 6000
          ? setTimeout(resolve, 300)
          : setTimeout(tick, 100);
      tick();
    })`,
  );
}

// Runs inside the page. Returns what fails, never throws.
const CHECKS = `(() => {
  const describe = (el) => {
    const cls = typeof el.className === "string" ? el.className.split(/\\s+/).slice(0, 3).join(".") : "";
    const text = (el.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 30);
    return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (cls ? "." + cls : "") + (text ? ' "' + text + '"' : "");
  };
  const root = document.documentElement;
  const viewport = root.clientWidth;
  const overflow = root.scrollWidth - viewport;
  let culprits = [];
  if (overflow > 0) {
    const sticking = [...document.body.querySelectorAll("*")].filter((el) => {
      const box = el.getBoundingClientRect();
      return box.width > 0 && box.right > viewport + 1;
    });
    // The deepest ones: a parent that sticks out only because of a child is
    // not where the fix goes.
    culprits = sticking
      .filter((el) => !sticking.some((other) => other !== el && el.contains(other)))
      .slice(0, 5)
      .map((el) => describe(el) + " → " + Math.round(el.getBoundingClientRect().right) + "px");
  }
  const skip = new Set(["hidden", "checkbox", "radio", "file", "range", "color"]);
  const smallFields = [...document.querySelectorAll("input, select, textarea")]
    .filter((el) => el.getClientRects().length && !skip.has(el.type))
    .map((el) => [el, parseFloat(getComputedStyle(el).fontSize)])
    .filter(([, size]) => size < 16)
    .map(([el, size]) => describe(el) + " → " + size + "px");
  return { overflow, culprits, smallFields };
})()`;

async function firstLink(page, prefixes) {
  return evaluate(
    page,
    `(() => {
      for (const prefix of ${JSON.stringify(prefixes)}) {
        const link = [...document.querySelectorAll("a[href]")].find((a) => {
          const path = new URL(a.href).pathname;
          return path.startsWith(prefix) && path.length > prefix.length && !path.endsWith("/new");
        });
        if (link) return new URL(link.href).pathname;
      }
      return null;
    })()`,
  );
}

const slug = (route) => route.replace(/^\/|\/$/g, "").replace(/\//g, "_") || "home";

async function measureApp(name, { port, routes, follow }) {
  const origin = `http://${host}:${port}`;
  const failures = [];
  const page = await openTarget();
  try {
    await page.send("Page.enable");
    await page.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await navigate(page, origin + "/");
    const detail = follow.length ? await firstLink(page, follow) : null;
    const screens = detail ? [...routes, detail] : routes;

    for (const theme of THEMES) {
      await page.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-color-scheme", value: theme }],
      });
      await evaluate(page, `localStorage.setItem("pieve-theme", ${JSON.stringify(theme)})`);
      for (const route of screens) {
        await navigate(page, origin + route);
        const result = await evaluate(page, CHECKS);
        const { data } = await page.send("Page.captureScreenshot", {
          format: "png",
          captureBeyondViewport: true,
        });
        const file = `${out}/${name}-${slug(route)}-${theme}.png`;
        await writeFile(file, Buffer.from(data, "base64"));

        const problems = [];
        if (result.overflow > 0)
          problems.push(`desborda ${result.overflow}px: ${result.culprits.join(" · ")}`);
        if (result.smallFields.length)
          problems.push(`campos bajo 16px: ${result.smallFields.join(" · ")}`);
        const label = `${name} ${route} (${theme})`;
        if (problems.length) {
          failures.push(label);
          console.log(`✗ ${label}\n    ${problems.join("\n    ")}`);
        } else {
          console.log(`✓ ${label}`);
        }
      }
    }
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    console.log(`✗ ${name}: ${error.message} (¿está levantada en ${origin}?)`);
  } finally {
    await page.close();
  }
  return failures;
}

await mkdir(out, { recursive: true });
const failures = [];
for (const name of selected) failures.push(...(await measureApp(name, APPS[name])));
console.log(
  failures.length
    ? `\n${failures.length} pantalla(s) con problemas. Capturas en ${out}/.`
    : `\nTodo bien a ${width}px. Capturas en ${out}/.`,
);
process.exit(failures.length ? 1 : 0);
