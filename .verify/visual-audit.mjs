import { chromium } from "playwright";
const browser = await chromium.launch();

const widths = [375, 768, 1024, 1180, 1440];
const sectionIds = ["hero", "work", "about", "journey", "services", "pricing", "testimonials", "faq", "contact"];

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  for (const id of sectionIds) {
    const el = await page.$(`#${id}`);
    if (!el) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `.verify/v-${w}-${id}.png` });
  }
  await page.close();
}

await browser.close();
console.log("done");
