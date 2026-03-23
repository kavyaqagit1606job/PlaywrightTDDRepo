const { BasePage } = require('../orangeHRM/basePage');
const { CONFIG }   = require('../../config/env');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // ─ Locators 
    this.usernameInput   = page.locator('#email');
    this.passwordInput   = page.locator('#password');
    this.loginButton     = page.locator('#submit');
    this.dashboardHeader = page.locator('h1')
    this.errorAlert      = page.locator('#error');
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
    await this.maualWait();
  }

  async submitEmptyForm() {
    await this.navigate();
    await this.clickLoginButton();                           
  }

  // ─ Assertions — all use BasePage assertion wrapper

  async assertLoginSuccess() {
    await this.waitForVisible(this.dashboardHeader, 15_0000); 
    await this.assertText(this.dashboardHeader,"Contact List");
  }

  async assertInvalidCredentialsError() {
    await this.waitForVisible(this.errorAlert, 18_000);       
    await this.assertText(this.errorAlert, 'Incorrect username or password'); 
  }
}

module.exports = { LoginPage };