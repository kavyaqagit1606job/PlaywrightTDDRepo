const { BasePage } = require('../orangeHRM/basePage');

class ContactListPage extends BasePage {
  constructor(page) {
    super(page);

    // ── Locators ──────────────────────────────────────────────────────────────
    this.pageHeader    = page.locator('h1');
    this.contactTable  = page.locator('#myTable');
    this.addContactBtn = page.locator('button#add-contact');
  }

  async assertContactVisible(firstName, lastName) {
    await this.assertVisible(                         // BasePage.assertVisible()
      this.contactTable.locator('tr').filter({ hasText: `${firstName} ${lastName}` })
    );
  }

  async assertContactNotVisible(firstName, lastName) {
    await this.assertHidden(                          // BasePage.assertHidden()
      this.contactTable.locator('tr').filter({ hasText: `${firstName} ${lastName}` })
    );
  }
}

module.exports = { ContactListPage };