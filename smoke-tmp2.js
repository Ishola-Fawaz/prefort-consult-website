const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle" });
  await page.fill('#field-name', 'Test User');
  await page.fill('#field-org', 'Test Org');
  await page.fill('#field-email', 'test@example.com');
  await page.selectOption('#service', 'risk-assessment');
  await page.click('button[type="submit"]');
  await page.waitForSelector("text=Something went wrong", { timeout: 15000 });
  await page.screenshot({ path: "scratch-contact-error.png" });
  console.log("error state reached");
  await browser.close();
})();
