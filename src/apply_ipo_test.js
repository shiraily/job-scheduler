Feature('apply_ipo');

Scenario('test something', ({ I }) => {
    I.amOnPage("https://www.sbisec.co.jp/");
    I.seeInCurrentUrl("ETGate");
    I.fillField("user_id", "user");
    I.fillField("user_password", "pass");
});
