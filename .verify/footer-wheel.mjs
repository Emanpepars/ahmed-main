import { chromium } from "playwright";
const browser = await chromium.launch();
for (const w of [375, 768, 1024]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.mouse.move(w/2, 450);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 25; j++) { await page.mouse.wheel(0, 40); await page.waitForTimeout(15); }
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `.verify/footer-real-${w}.png` });
  await page.close();
}
await browser.close();
