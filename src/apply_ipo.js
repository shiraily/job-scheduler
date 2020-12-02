Feature('apply_ipo');

const unit = 100;

Scenario(`apply_ipo`, ({ I }) => {
  I.amOnPage("https://www.sbisec.co.jp/");
  I.seeInCurrentUrl("ETGate");
  I.fillField("user_id", process.env.SBI_USERNAME);
  I.fillField("user_password", process.env.SBI_PASSWORD);
  I.click("ACT_login");
  I.see("お知らせ");

  let n = 0;
  while (n < 20) {
    I.amOnPage("https://m.sbisec.co.jp/oeliw011?type=21");
    I.click("申込"); // TODO fallback

    I.fillField("suryo", unit);
    I.click("ストライクプライス");
    I.fillField("tr_pass", process.env.SBI_TRADE_PASSWORD);
    I.click("申込確認画面へ");

    I.click("申込");
    n += 1;
  }
});
