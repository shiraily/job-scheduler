Feature('apply_gotoeat_tokyo');

// TODO simplify

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(i => {
  Scenario(`apply${i}`, ({ I }) => {
    I.amOnPage("https://hajb.f.msgs.jp/webapp/form/23667_hajb_1/index.do");
    I.fillField("address", process.env.EMAIL_ADDRESS);
    I.fillField("domain", process.env.EMAIL_DOMAIN);
    I.fillField("address2", process.env.EMAIL_ADDRESS);
    I.fillField("domain2", process.env.EMAIL_ADDRESS);
    I.click("確認画面へ");
    I.click("申込みを確定する");
  });
})
