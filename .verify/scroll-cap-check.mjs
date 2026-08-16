import { chromium } from "playwright";
const browser = await chromium.launch();
for (const w of [375, 768, 1024, 1280, 1440]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.mouse.move(w/2, 450);
  for (let i = 0; i < 22; i++) {
    for (let j = 0; j < 25; j++) { await page.mouse.wheel(0, 40); await page.waitForTimeout(12); }
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(500);
  const y = await page.evaluate(() => window.scrollY);
  const docHeight = await page.evaluate(() => document.body.scrollHeight);
  const maxPossible = docHeight - w > 0 ? docHeight - 900 : 0;
  console.log(`width ${w}: scrollY=${y} docHeight=${docHeight} maxPossible=${maxPossible} gap=${maxPossible - y}`);
  await page.close();
}
await browser.close();
