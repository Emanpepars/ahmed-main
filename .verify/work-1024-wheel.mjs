import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.mouse.move(720, 450);
async function wheelTo(delta, steps = 30) {
  for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, delta / steps); await page.waitForTimeout(25); }
  await page.waitForTimeout(700);
}
const work = await page.$("#work");
const box = await work.boundingBox();
await wheelTo(box.y + 300);
await page.screenshot({ path: ".verify/work-1024-wheel-1.png" });
await wheelTo(500);
await page.screenshot({ path: ".verify/work-1024-wheel-2.png" });
console.log("errors", errors.slice(0, 10));
await browser.close();
