import puppeteer from "puppeteer";

/** 取引単位（株） */
const unit = 100;

// TODO do not use waitForTimeout
const _apply = async (browser) => {
  console.log("start applying IPO");
  const page = await browser.newPage();
  page.setViewport({width: 1280, height: 720});
  console.log("succeeded to launch browser");
  await page.goto("https://www.sbisec.co.jp/");
  await page.type("input[name=user_id]", process.env.SBI_USERNAME);
  await page.type("input[name=user_password]", process.env.SBI_PASSWORD);

  await page.click("input[name=ACT_login]");

  let n = 0;
  while (n < 5) {
    await page.waitForTimeout(1000);
    await page.goto("https://m.sbisec.co.jp/oeliw011?type=21");
    await page.waitForTimeout(1000);
    let canApply = true;
    await page.click("img[alt=申込]").catch( () => {canApply = false;});
    if (!canApply) {
      console.log("no more BB");
      break;
    };
    await page.waitForTimeout(1000);

    await page.type("input[name=suryo]", unit.toString());
    await page.click("#strPriceRadio");
    await page.type("input[name=tr_pass]", process.env.SBI_TRADE_PASSWORD);
    await page.click("input[name=order_kakunin]");
    await page.waitForTimeout(1000);

    await page.click("input[name=order_btn]");
    console.log(`apply ${n}`);
    n += 1;
  }
}

// TODO use Secret Manager instead of dotenv
export const applyIPO = async () => {
  const browser = await puppeteer.launch(
    {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '-–disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ],
    }
  );
  try {
    await _apply(browser);
  } finally {
    browser.close();
  }
};