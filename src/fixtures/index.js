const { test: base } = require('@playwright/test');
const path           = require('path');
const { CONFIG }     = require('../config/env');

const { LoginPage }  = require('../pages/orangeHRM/loginPage');
const { CommonPage } = require('../pages/orangeHRM/commonPage');
const { JobsPage }   = require('../pages/orangeHRM/jobsPage');
const { uploadPaths } = require('../utils/uploadPaths');

// Load test data once at startup
const userData = require(
  path.resolve(__dirname, `../../testData/${CONFIG.testDataPath}/userData.json`)
);
const testData = require(
  path.resolve(__dirname, `../../testData/${CONFIG.testDataPath}/testData.json`)
);

const test = base.extend({

  // Page object fixtures — auto-instantiated per test, no `new` in specs ever
  loginPage:  async ({ page }, use) => { await use(new LoginPage(page));  },
  commonPage: async ({ page }, use) => { await use(new CommonPage(page)); }, // ← commonPage not commonPages
  jobsPage:   async ({ page }, use) => { await use(new JobsPage(page));   },

  // Data fixtures — available in every test that declares them
  userData: async ({}, use) => { await use(userData); },
  testData: async ({}, use) => { await use(testData); },

  // Upload file paths
  uploads: async ({}, use) => { await use(uploadPaths); },

});

const { expect } = base;
module.exports = { test, expect };