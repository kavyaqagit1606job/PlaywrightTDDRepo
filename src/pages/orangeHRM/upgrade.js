const { BasePage } = require('./basePage');

class UpgradePage extends BasePage {
  constructor(page) {
    super(page);

    // ── Locators on the main OrangeHRM page ──────────────────────────────────
    this.upgradeButton = page.getByRole('button', { name: 'Upgrade' }); // ← no .click() in constructor
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Clicks Upgrade button and waits for the popup tab to open.
   * Returns a new UpgradePage instance wrapping the popup page
   * so all actions on the popup also use BasePage methods.
   *
   * Usage:
   *   const popupPage = await upgradePage.clickUpgradeAndGetPopup();
   *   await popupPage.clickContactSales();
   */
  async clickUpgradeAndGetPopup() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.click(this.upgradeButton);            
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    return new UpgradePopupPage(popup);              // return popup wrapped in its own POM
  }
}

/**
 * UpgradePopupPage
 * Wraps the popup tab that opens after clicking Upgrade.
 * Extends BasePage so all BasePage methods work on the popup page too.
 */
class UpgradePopupPage extends BasePage {
  constructor(page) {
    super(page);

    // ── Locators on the popup tab ─────────────────────────────────────────
    this.contactSalesButton  = page.getByRole('button', { name: 'Contact Sales' });
    this.bookDemoButton      = page.getByRole('button', { name: 'Book a Free Demo' });
    this.navbar              = page.locator('#navbarNav');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async clickContactSales() {
    await this.click(this.contactSalesButton);
  }

  async clickBookAFreeDemo() {
    await this.click(this.bookDemoButton);           // BasePage.click()
  }

  async assertContactSalesVisible() {
    await this.assertVisible(                        // BasePage.assertVisible()
      this.navbar.getByRole('button', { name: 'Contact Sales' })
    );
  }

  async assertNavbarContainsContactSales() {
    await this.assertText(this.navbar, 'Contact Sales'); // BasePage.assertText()
  }
}

module.exports = { UpgradePage, UpgradePopupPage };