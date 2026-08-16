import { chromium } from "playwright";
const browser = await chromium.launch();

const widths = [320, 360, 390, 414, 430, 768, 820, 1024, 1180, 1280, 1440, 1920];

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  const info = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    const overflowing = [];
    if (docWidth > winWidth + 2) {
      // find culprit elements
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > winWidth + 2 || r.left < -2) {
          if (overflowing.length < 8) {
            overflowing.push({
              tag: el.tagName,
              cls: el.className?.toString().slice(0, 70),
              right: Math.round(r.right),
              left: Math.round(r.left),
            });
          }
        }
      });
    }
    return { docWidth, winWidth, overflowing };
  });

  console.log(`\n=== width ${w} ===`);
  if (info.docWidth > info.winWidth + 2) {
    console.log(`HORIZONTAL OVERFLOW: doc=${info.docWidth} win=${info.winWidth}`);
    console.log(JSON.stringify(info.overflowing, null, 2));
  } else {
    console.log("no overflow");
  }
  if (errors.length) console.log("errors:", errors.slice(0, 5));

  await page.close();
}

await browser.close();
