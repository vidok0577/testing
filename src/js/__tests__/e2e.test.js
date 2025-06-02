import puppeteer from "puppeteer";
import { fork } from "child_process";

const setDetectCard = [
  ["4929733032396729", "Visa", true],
  ["5590135090399873", "Mastercard", true],
  ["341444637193234", "American Express", true],
  ["6011810435464546", "Discover", true],
  ["2200450150311554", "Mir", true],
  ["5555555555555555", "Invalid Card Number", false],
  ["asdfasdfasdfasdf", "Please enter a card number", false],
  [" ", "Please enter a card number", false],
];

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://127.0.0.1:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/../e2e.server.js`);
    server.on("message", (message) => {
      if (message === "ok") {
        console.log(message);
      }
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 50,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test.each(setDetectCard)("testing card %s", async (card, brand, detect) => {
    await page.goto(baseUrl);
    const form = await page.$(".card-input");
    const submit = await page.$(".validate-btn");
    const validResult = detect ? "valid" : "invalid";

    await form.type(`${card}`);
    await submit.click();
    await page.waitForSelector(`.validation-result.${validResult}`);

    const result = await page.$eval(".validation-result", (el) => el.innerText);
    await expect(result).toMatch(brand);
  });
});
