import { chromium } from "playwright";
const browser = await chromium.launch();

const widths = [375, 768, 1024, 1280, 1440];
const sectionIds = ["hero", "work", "about", "journey", "services", "pricing", "testimonials", "faq", "contact"];

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  console.log(`\n========== width ${w} ==========`);
  for (const id of sectionIds) {
    const el = await page.$(`#${id}`);
    if (!el) {
      console.log(`  #${id}: not found`);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const info = await page.evaluate(() => ({
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
    }));
    const overflow = info.docWidth > info.winWidth + 2;
    console.log(`  #${id}: doc=${info.docWidth} win=${info.winWidth} ${overflow ? "OVERFLOW!" : "ok"}`);
  }
  if (errors.length) console.log("errors:", errors.slice(0, 5));
  await page.close();
}

await browser.close();
