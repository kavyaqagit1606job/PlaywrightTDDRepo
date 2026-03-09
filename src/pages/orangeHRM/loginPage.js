const { BasePage } = require('./basePage');
const { CONFIG }   = require('../../config/env');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // ─ Locators 
    this.usernameInput   = page.locator('[name="username"]');
    this.passwordInput   = page.locator('[name="password"]');
    this.loginButton     = page.locator('[type="submit"]');
    this.dashboardHeader = page.locator('div.oxd-topbar-header');
    this.errorAlert      = page.locator('p.oxd-alert-content-text');
    this.requiredErrors  = page.locator('span.oxd-input-field-error-message');
  }

  // ─ Actions

  async navigate() {
    await this.goto(CONFIG.baseURL);                        
  }

  async enterUsername(username) {
    await this.fill(this.usernameInput, username);           
  }

  async enterPassword(password) {
    await this.fill(this.passwordInput, password);            
  }

  async clickLoginButton() {
    await this.click(this.loginButton);                       
  }

  async login(username, password) {
    await this.navigate();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginAsAdmin(userData) {
    const { userName, password } = userData.valid[0];
    await this.login(userName, password);
    await this.assertLoginSuccess();
  }

  async submitEmptyForm() {
    await this.navigate();
    await this.clickLoginButton();                           
  }

  // ─ Assertions — all use BasePage assertion wrapper

  async assertLoginSuccess() {
    await this.waitForVisible(this.dashboardHeader, 15_0000); 
  }

  async assertInvalidCredentialsError() {
    await this.waitForVisible(this.errorAlert, 8_000);       
    await this.assertText(this.errorAlert, 'Invalid credentials'); 
  }

  async assertRequiredFieldErrors() {
    await this.waitForVisible(this.requiredErrors.first());  
    const { expect } = require('@playwright/test');
    await expect(this.requiredErrors).toHaveCount(2);
    await expect(this.requiredErrors).toHaveText(['Required', 'Required']);
  }
}

module.exports = { LoginPage };