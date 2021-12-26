import https from "https";
import { getBrowser } from "./common/puppeteer";



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



const _apply = async (browser) => {
  console.log("start detecting Hara Museum cancel");
  const page = await browser.newPage();
  page.setViewport({width: 1280, height: 720});
  await page.goto("https://www.etix.com/kketix/e/2006060");
  await page.waitForTimeout(3000);

  let days;
  days = await getAvailableDays(page);
  if (days.length) {
    sendRequest( `原美術館のキャンセルが出ました!! ${days}`);
    return;
  }
  await page.click("i.fa-angle-right");
  await page.waitForTimeout(3000);
  days = await getAvailableDays(page);
  if (days.length) {
    sendRequest( `原美術館のキャンセルが出ました!! ${days}`);
    return;
  }
  console.log("Hara Museum: No cancel");
}

const getAvailableDays = async (page) => {
  const querySelector = "td.day:not(.disabled)";
  var elements = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    return list.map(data => data.textContent);
  }, querySelector);
  if (elements.length) {
    console.log("detected!!", elements);
  }
  return elements;
}

export const detectHaraMuseumCancel = async () => {
  const browser = await getBrowser();
  try {
    await _apply(browser);
  } catch(e) {
    console.log("error", e);
  } finally {
    browser.close();
  }
};