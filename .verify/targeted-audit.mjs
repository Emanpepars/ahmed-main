import { chromium } from "playwright";
const browser = await chromium.launch();

const widths = [768, 1024, 1180];
const sectionIds = ["work", "about", "journey", "services", "pricing", "testimonials", "faq", "contact"];

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.mouse.move(w / 2, 450);

  async function wheelBy(delta, steps = 25) {
    const s = Math.max(6, Math.round(Math.abs(delta) / 40));
    for (let i = 0; i < s; i++) {
      await page.mouse.wheel(0, delta / s);
      await page.waitForTimeout(20);
    }
    await page.waitForTimeout(700);
  }

  let lastY = 0;
  for (const id of sectionIds) {
    const targetY = await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      return el ? window.scrollY + el.getBoundingClientRect().top : null;
    }, id);
    if (targetY === null) continue;
    const delta = targetY - lastY + 60; // small offset past the top edge
    await wheelBy(delta);
    lastY = await page.evaluate(() => window.scrollY);
    await page.screenshot({ path: `.verify/t-${w}-${id}.png` });
  }

  if (errors.length) console.log(`width ${w} errors:`, errors.slice(0, 10));
  await page.close();
}

await browser.close();
console.log("done");
