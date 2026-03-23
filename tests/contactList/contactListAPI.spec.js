const { test, expect } = require('../../src/fixtures');

/**
 * Pure API Tests
 *
 * Token is fetched ONCE in beforeAll and reused across all tests.
 * contactId is set in TC-API-002 and reused in TC-API-003, 004, 005.
 *
 * Run with: APP=contactList ENV=staging npx playwright test tests/contactList/contacts.api.spec.js
 */
test.describe('ContactList - API', () => {

  let token;
  let contactId;

  // ── Get token once before the whole suite ─────────────────────────────────
  test.beforeAll(async ({ apiClient, userData }) => {
    token = await apiClient.getToken(userData.valid[0]);
    expect(token, 'Token must be present before API tests run').toBeTruthy();
  });

  // ── TC-API-001 ────────────────────────────────────────────────────────────
  test('TC-API-001 | POST /users - valid credentials return a token', async ({ apiClient, userData }) => {
    const freshToken = await apiClient.getToken(userData.valid[0]);
    expect(freshToken).toBeTruthy();
    expect(typeof freshToken).toBe('string');
  });

  // ── TC-API-002 ────────────────────────────────────────────────────────────
  test('TC-API-002 | POST /contacts - create contact returns 201 with correct body', async ({ apiClient, testData }) => {
    const contactData = testData.contacts[0];

    const response = await apiClient.createContact(token, contactData);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body._id).toBeTruthy();
    expect(body.firstName).toBe(contactData.firstName);
    expect(body.lastName).toBe(contactData.lastName);
    expect(body.email).toBe(contactData.email);

    contactId = body._id;  // store for use in subsequent tests
  });

  // ── TC-API-003 ────────────────────────────────────────────────────────────
  test('TC-API-003 | GET /contacts - created contact is present in list', async ({ apiClient, testData }) => {
    const response = await apiClient.getContacts(token);
    expect(response.status()).toBe(200);

    const contacts = await response.json();
    const found = contacts.some(c => c._id === contactId);
    expect(found, `Contact ${contactId} should exist in GET /contacts`).toBe(true);
  });

  // ── TC-API-004 ────────────────────────────────────────────────────────────
  test('TC-API-004 | DELETE /contacts/:id - returns 200', async ({ apiClient }) => {
    const response = await apiClient.deleteContact(token, contactId);
    expect(response.status()).toBe(200);
  });

  // ── TC-API-005 ────────────────────────────────────────────────────────────
  test('TC-API-005 | GET /contacts - deleted contact is no longer in list', async ({ apiClient }) => {
    const response = await apiClient.getContacts(token);
    expect(response.status()).toBe(200);

    const contacts = await response.json();
    const found = contacts.some(c => c._id === contactId);
    expect(found, `Contact ${contactId} should NOT exist after deletion`).toBe(false);
  });

});