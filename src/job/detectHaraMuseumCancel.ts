// deprecated

const _apply = async (browser) => {
  console.log("start detecting Hara Museum cancel");
  const page = await browser.newPage();
  page.setViewport({width: 1280, height: 720});
  await page.goto("https://www.etix.com/kketix/e/2006060");
  await page.waitForTimeout(3000);

  let days;
  days = await getAvailableDays(page);
  if (days.length) {
    console.log( `原美術館のキャンセルが出ました!! ${days}`);
    return;
  }
  await page.click("i.fa-angle-right");
  await page.waitForTimeout(3000);
  days = await getAvailableDays(page);
  if (days.length) {
    console.log( `原美術館のキャンセルが出ました!! ${days}`);
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
