const { CONFIG } = require('../../config/env');

const BASE = CONFIG.baseURL;

const ENDPOINTS = {
  login:           `${BASE}/users/login`,
  contacts:        `${BASE}/contacts`,
  contactById: (id) => `${BASE}/contacts/${id}`,
  userProfile:     `${BASE}/users/me`,
};

module.exports = { ENDPOINTS };