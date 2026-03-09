// NOTE: dotenv is intentionally NOT loaded here.
// playwright.config.js loads it first — that guarantees all process.env
// vars are populated before this module resolves any URLs.

const APP = process.env.APP || 'orangeHRM';
const ENV = process.env.ENV || 'staging';

// ── Per-app URL map ───────────────────────────────────────────────────────────
const urls = {
  orangeHRM: {
    dev:     process.env.ORANGEHRM_DEV_URL,
    staging: process.env.ORANGEHRM_STAGING_URL,
    prod:    process.env.ORANGEHRM_PROD_URL
  },
  contactList: {
    dev:     process.env.CONTACTLIST_DEV_URL,
    staging: process.env.CONTACTLIST_STAGING_URL,
    prod:    process.env.CONTACTLIST_PROD_URL
  }
};

// ── Per-app static config (selectors never change between envs) ───────────────
const appConfig = {
  orangeHRM: {
    testDataPath: 'orangeHRM',
    loginSelectors: {
      username: '[name="username"]',
      password: '[name="password"]',
      loginBtn: '[type="submit"]',
      header:   'div.oxd-topbar-header'
    }
  },
  contactList: {
    testDataPath: 'contactList',
    loginSelectors: {
      username: '#email',
      password: '#password',
      loginBtn: '#submit',
      header:   'div.main-content h1'
    }
  }
};

// ── Guards ────────────────────────────────────────────────────────────────────
if (!appConfig[APP]) {
  throw new Error(
    `Invalid APP: "${APP}". Valid options: ${Object.keys(appConfig).join(', ')}`
  );
}
if (!urls[APP] || !urls[APP][ENV]) {
  throw new Error(
    `Invalid ENV: "${ENV}" for APP: "${APP}". Valid options: ${Object.keys(urls[APP] || {}).join(', ')}`
  );
}
if (!urls[APP][ENV]) {
  throw new Error(
    `URL for APP="${APP}" ENV="${ENV}" is undefined. Check your .env file.`
  );
}

// ── Resolved config ───────────────────────────────────────────────────────────
const CONFIG = {
  ...appConfig[APP],
  baseURL: urls[APP][ENV]
};

console.log(`[config] APP=${APP} | ENV=${ENV} | baseURL=${CONFIG.baseURL}`);

module.exports = { APP, ENV, CONFIG };