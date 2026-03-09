const { expect } = require('@playwright/test');

/**
 * BasePage
 * Every POM extends this.
 *
 * All methods accept EITHER a selector string OR a Playwright Locator:
 *   await this.click('button.submit')          // selector string
 *   await this.click(this.saveButton)          // locator defined in constructor
 *
 * This means child pages define locators once in the constructor,
 * then use BasePage methods everywhere — no direct page.locator() calls scattered
 * through action methods.
 */
class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  // Accepts a string selector OR a Locator — returns a Locator either way.
  _resolve(selectorOrLocator) {
    return typeof selectorOrLocator === 'string'
      ? this.page.locator(selectorOrLocator)
      : selectorOrLocator;
  }

  // ─ Navigation

  async goto(url, options = {}) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', ...options });
  }

  async waitForURL(urlPattern, timeout = 15_000) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  // Interactions

  async fill(selectorOrLocator, value) {
    await this._resolve(selectorOrLocator).fill(value);
  }

  async click(selectorOrLocator) {
    await this._resolve(selectorOrLocator).click();
  }

  async selectDropdown(selectorOrLocator, visibleText) {
    await this._resolve(selectorOrLocator).selectOption({ label: visibleText });
  }

  async uploadFile(selectorOrLocator, filePath) {
    await this._resolve(selectorOrLocator).setInputFiles(filePath);
  }

  // Waits
  async waitForVisible(selectorOrLocator, timeout = 10_000) {
    await this._resolve(selectorOrLocator).waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(selectorOrLocator, timeout = 10_000) {
    await this._resolve(selectorOrLocator).waitFor({ state: 'hidden', timeout });
  }

  // ─ Assertions 

  async assertVisible(selectorOrLocator) {
    await expect(this._resolve(selectorOrLocator)).toBeVisible();
  }

  async assertHidden(selectorOrLocator) {
    await expect(this._resolve(selectorOrLocator)).toBeHidden();
  }

  async assertText(selectorOrLocator, expectedText) {
    await expect(this._resolve(selectorOrLocator)).toContainText(expectedText);
  }

  async assertURL(urlPattern) {
    await expect(this.page).toHaveURL(urlPattern);
  }

  async getToastMessage() {
    const toast = this.page.locator('div.oxd-toast-content');
    await toast.waitFor({ state: 'visible', timeout: 8_000 });
    return toast.innerText();
  }
}

module.exports = { BasePage };