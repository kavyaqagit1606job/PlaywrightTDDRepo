const { test, expect } = require('../../src/fixtures');

test.describe('Upgrade', () => {

  test.beforeEach(async ({ loginPage, userData }) => {
    await loginPage.loginAsAdmin(userData);
  });

  test('TC-UPGRADE-001 | Click Upgrade, verify Contact Sales and Book a Free Demo on popup', async ({ upgradePage }) => {

    // Click Upgrade on main page — popup tab opens, returns UpgradePopupPage
    const popupPage = await upgradePage.clickUpgradeAndGetPopup();

    // Assert Contact Sales is visible in navbar on the popup
    await popupPage.assertContactSalesVisible();
    await popupPage.assertNavbarContainsContactSales();

    // Click Contact Sales
    await popupPage.clickContactSales();

    // Click Book a Free Demo
    await popupPage.clickBookAFreeDemo();
  });

});