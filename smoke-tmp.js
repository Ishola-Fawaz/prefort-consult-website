const { chromium } = require("playwright");
const errors = [];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(`console [${page.url()}]: ${msg.text()}`); });
  page.on("pageerror", (err) => errors.push(`pageerror [${page.url()}]: ${err.message}`));

  for (const path of ["/services", "/training", "/about", "/privacy"]) {
    await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `scratch${path.replace(/\//g, "-")}.png`, fullPage: true });
  }

  // Contact page with band query param
  await page.goto("http://localhost:3000/contact?band=exposed", { waitUntil: "networkidle" });
  await page.waitForSelector("text=Tell us what you're dealing with");
  await page.screenshot({ path: "scratch-contact-page.png", fullPage: true });

  // Fill and submit the form (DB not configured locally, so we expect a graceful error state)
  await page.fill('#field-name', 'Test User');
  await page.fill('#field-org', 'Test Org');
  await page.fill('#field-email', 'test@example.com');
  await page.selectOption('#service', 'risk-assessment');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "scratch-contact-submitted.png" });

  await browser.close();
  console.log("ERRORS:", errors.length ? errors.join("\n") : "none");
})();
