import https from "https";
import puppeteer from "puppeteer";

const sendRequest = (text) => {
  const data = JSON.stringify({username: "bot", icon_emoji: ":ghost:", text});

  const options = {
      hostname: 'hooks.slack.com',
      port: 443,
      path: process.env.SLACK_WEBHOOK,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
      }
  };
  const req = https.request(options, (res) =>{
    if(res.statusCode===200){
        console.log("OK:"+res.statusCode);
    }else{
        console.log("Status Error:"+res.statusCode);
    }
  });
  req.on('error',(e)=>{
      console.error(e);
  });

  req.write(data);
  req.end();

}

// TODO do not use waitForTimeout
const _apply = async (browser) => {
  console.log("start inputting Shinsei Bank entry");
  const page = await browser.newPage();
  page.setViewport({width: 1280, height: 720});
  await page.goto("https://webform.shinseibank.com/webapp/form/19913_xldb_4/index.do?lid=p");
  await page.type("#fi_account_num", process.env.SHINSEI_ACCOUNT);
  await page.type("#fi_birth_year", process.env.BIRTH_YEAR);
  await page.type("#fi_birth_month", process.env.BIRTH_MONTH);
  await page.type("#fi_birth_day", process.env.BIRTH_DAY);

  await page.type("#fi_point_t16", process.env.T_POINT);
  await page.type("#fi_mail", process.env.EMAIL_ADDRESS);

  await page.click("label[for=fi_policy]");
  await page.click("input[type=submit]");

  await page.waitForTimeout(3000);
  await page.click("input[type=submit]");
  await page.waitForTimeout(3000);
  const title = await page.title();

  const isEntrySucceeded = title.indexOf("エントリー完了") !== -1;
  console.log("success?", isEntrySucceeded);
  return isEntrySucceeded;
}



export const inputShinseiBankEntry = async () => {
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
    },
  );
  let result = null;
  try {
    result = await _apply(browser);
  } catch(e) {
    console.log("error", e);
  } finally {
    sendRequest(`新生銀行のポイントプログラムへエントリーしました。結果: ${result}`);
    browser.close();
  }
};