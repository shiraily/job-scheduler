Feature('apply_ipo');

[1].forEach(i => {
    Scenario(`apply${i}`, ({ I }) => {
        I.amOnPage("https://www.sbisec.co.jp/");
        I.seeInCurrentUrl("ETGate");
        I.fillField("user_id", process.env.SBI_USERNAME);
        I.fillField("user_password", process.env.SBI_PASSWORD);
        I.click("ACT_login");
        I.see("お知らせ");
        I.amOnPage("https://m.sbisec.co.jp/oeliw011?type=21");
        I.see("IPOチャレンジポイント"); // TODO 申し込み ?
    });
});
