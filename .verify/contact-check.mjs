import { chromium } from "playwright";
const browser = await chromium.launch();
for (const w of [375, 768, 1024]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto("http://localhost:3000/#contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `.verify/footer-${w}.png` });
  await page.close();
}
await browser.close();
