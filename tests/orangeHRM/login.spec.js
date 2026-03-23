const { test, expect } = require('../../src/fixtures');

test.describe('Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });


  test('TC-LOGIN-001 | Valid credentials - login succeeds', async ({ loginPage, userData }) => {
    await loginPage.enterUsername(userData.valid[0].userName);
    await loginPage.enterPassword(userData.valid[0].password);
    await loginPage.clickLoginButton();

    await loginPage.assertLoginSuccess();
  });


  const { invalid } = require('../../testData/orangeHRM/userData.json');

  for (const [i, creds] of invalid.entries()) {
    test(`TC-LOGIN-00${i + 2} | Invalid credentials [${i + 1}] - error shown`, async ({ loginPage }) => {
      await loginPage.enterUsername(creds.userName);
      await loginPage.enterPassword(creds.password);
      await loginPage.clickLoginButton();

      await loginPage.assertInvalidCredentialsError();
    });
  }

  test('TC-LOGIN-010 | Empty form submission - required field errors shown', async ({ loginPage }) => {
    await loginPage.submitEmptyForm();
    await loginPage.assertRequiredFieldErrors();
  });

});