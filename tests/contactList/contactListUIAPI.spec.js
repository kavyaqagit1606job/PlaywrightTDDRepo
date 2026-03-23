const { test, expect } = require('../../src/fixtures');

/**
 * UI + API Combined Test
 *
 * How token extraction works:
 *   When you login via the browser UI, the app makes a POST /users request
 *   and stores the token in localStorage under the key 'token'.
 *   We read it directly from localStorage after login — no second API login call needed.
 *
 * Flow:
 *   1. UI  — login via browser
 *   2. UI  — extract token from localStorage (set by the app after login)
 *   3. API — POST /contacts using that token  → create contact
 *   4. UI  — reload page, verify contact appears in table
 *   5. API — DELETE /contacts/:id            → delete contact
 *   6. UI  — reload page, verify contact gone
 */
test.describe('ContactList - UI + API', () => {

  test.beforeEach(async ({ contactLoginPage, userData }) => {
    await contactLoginPage.loginAsAdmin(userData);  // ← pass userData, loginPage needs it
  });

  test('TC-CONTACT-001 | Create contact via API → verify in UI → delete via API → verify removed',
    async ({ page, contactListPage, apiClient, userData, testData }) => {

    const contactData = testData.contacts[0];
        // Using page.request instead of the standalone `request` context
    // because page.request shares the same browser session/cookies as the UI.
    // const loginResponse = await page.request.post(
    //   'https://thinking-tester-contact-list.herokuapp.com/users/login',
    //   {
    //     headers: { 'Content-Type': 'application/json' },
    //     data: {
    //       email:    userData.valid[0].userName,
    //       password: userData.valid[0].password
    //     }
    //   }
    // );
 
    // console.log('[login] status:', loginResponse.status());
    // const loginBody = await loginResponse.json();
    // console.log('[login] body:', loginBody);
 
    // const token = loginBody.token;
    // ── Step 1: Extract token from localStorage after UI login ─────────────
    // The ContactList app stores the JWT in localStorage['token'] after login.
    // This avoids a second POST /users call — we reuse what the browser already has.
    const token = await apiClient.getToken(userData.valid[0]);
    expect(token, 'Token must be returned from POST /users').toBeTruthy();
    //const token = await page.evaluate(() => localStorage.getItem('token'));
    //expect(token, 'Token must exist in localStorage after UI login').toBeTruthy();
    console.log(token);
    // ── Step 2: Create contact via API using the UI session token ──────────
    const createResponse = await apiClient.createContact(token, contactData);
    expect(createResponse.status()).toBe(201);

    const created   = await createResponse.json();
    const contactId = created._id;
    expect(contactId).toBeTruthy();

    // ── Step 3: Reload UI and verify contact appears in the table ──────────
    await page.reload();
    await contactListPage.assertContactVisible(contactData.firstName, contactData.lastName);

    // ── Step 4: Delete the contact via API ─────────────────────────────────
    const deleteResponse = await apiClient.deleteContact(token, contactId);
    expect(deleteResponse.status()).toBe(200);

    // ── Step 5: Reload UI and verify contact is gone ───────────────────────
    await page.reload();
    await contactListPage.assertContactNotVisible(contactData.firstName, contactData.lastName);
  });

});