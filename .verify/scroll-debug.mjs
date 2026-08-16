import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.mouse.move(512, 450);
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 25; j++) { await page.mouse.wheel(0, 40); await page.waitForTimeout(15); }
  await page.waitForTimeout(300);
  const y = await page.evaluate(() => window.scrollY);
  console.log(`round ${i}: scrollY=${y}`);
}
console.log("docHeight", await page.evaluate(() => document.body.scrollHeight));
await browser.close();
