Feature('apply_ipo');

Scenario('apply', ({ I }) => {
    I.amOnPage("https://www.sbisec.co.jp/");
    I.seeInCurrentUrl("ETGate");
    I.fillField("user_id", "aaa");
    I.fillField("user_password", "pass");
    I.click("ログイン");
});
