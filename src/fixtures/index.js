const { test: base } = require('@playwright/test');
const path           = require('path');
const { CONFIG }     = require('../config/env');

// ── OrangeHRM pages ───────────────────────────────────────────────────────────
const { LoginPage }   = require('../pages/orangeHRM/loginPage');
const { CommonPage }  = require('../pages/orangeHRM/commonPage');
const { JobsPage }    = require('../pages/orangeHRM/jobsPage');
const { UpgradePage } = require('../pages/orangeHRM/upgrade');
const { uploadPaths } = require('../utils/uploadPaths');

// ── ContactList pages + API ───────────────────────────────────────────────────
const { LoginPage: ContactLoginPage } = require('../pages/contactList/loginPage');  // aliased to avoid name clash
const { ContactListPage }             = require('../pages/contactList/contactListPage');
const { ApiClient }                   = require('../pages/contactList/apiclient');

// ── Test data — driven by APP in .env ─────────────────────────────────────────
const userData = require(
  path.resolve(__dirname, `../../testData/${CONFIG.testDataPath}/userData.json`)
);
const testData = require(
  path.resolve(__dirname, `../../testData/${CONFIG.testDataPath}/testData.json`)
);

const test = base.extend({

  // ── OrangeHRM fixtures ──────────────────────────────────────────────────────
  loginPage:   async ({ page }, use) => { await use(new LoginPage(page));   },
  commonPage:  async ({ page }, use) => { await use(new CommonPage(page));  },
  jobsPage:    async ({ page }, use) => { await use(new JobsPage(page));    },
  upgradePage: async ({ page }, use) => { await use(new UpgradePage(page)); },
  uploads:     async ({}, use)       => { await use(uploadPaths);           },

  // ── ContactList UI fixtures ─────────────────────────────────────────────────
  contactLoginPage: async ({ page }, use) => { await use(new ContactLoginPage(page)); },
  contactListPage:  async ({ page }, use) => { await use(new ContactListPage(page));  },

  // ── ContactList API fixture ───────────────────────────────────────────────
  // `request` = Playwright's built-in APIRequestContext, injected automatically
  apiClient: async ({ request }, use) => { await use(new ApiClient(request)); },

  // ── Data fixtures ───────────────────────────────────────────────────────────
  userData: async ({}, use) => { await use(userData); },
  testData: async ({}, use) => { await use(testData); },

});

const { expect } = base;
module.exports = { test, expect };