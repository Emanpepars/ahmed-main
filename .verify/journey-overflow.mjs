import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.mouse.move(500, 450);
async function wheelBy(delta, steps = 25) {
  for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, delta / steps); await page.waitForTimeout(20); }
  await page.waitForTimeout(700);
}
const targetY = await page.evaluate(() => {
  const el = document.getElementById("journey");
  return el.getBoundingClientRect().top + window.scrollY;
});
await wheelBy(targetY + 400);
const info = await page.evaluate(() => {
  const docWidth = document.documentElement.scrollWidth;
  const winWidth = window.innerWidth;
  const cards = Array.from(document.querySelectorAll('a[href], div')).filter(el => {
    const r = el.getBoundingClientRect();
    return r.right > winWidth + 1 && r.width > 100 && r.width < 500;
  });
  return {
    docWidth, winWidth,
    overflowingCards: cards.slice(0, 5).map(el => ({ cls: el.className.toString().slice(0,60), right: Math.round(el.getBoundingClientRect().right) })),
  };
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: ".verify/journey-1024-check.png" });
await browser.close();
