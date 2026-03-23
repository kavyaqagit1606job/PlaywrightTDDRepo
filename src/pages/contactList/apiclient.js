const { ENDPOINTS } = require('./endPoints');

class ApiClient {
  /** @param {import('@playwright/test').APIRequestContext} request */
  constructor(request) {
    this.request = request;
  }

  /**
   * POST /users — returns bearer token
   * @param {{ userName: string, password: string }} credentials
   * @returns {Promise<string>} token
   */
  async getToken(credentials) {
    const response = await this.request.post(ENDPOINTS.login, {
      data: {
        email:    credentials.userName,
        password: credentials.password
      }
    });
    const body = await response.json();
    return body.token;
  }

  /** POST /contacts */
  async createContact(token, contactData) {
    return this.request.post(ENDPOINTS.contacts, {
      headers: { Authorization: `Bearer ${token}` },
      data:    contactData
    });
  }

  /** GET /contacts */
  async getContacts(token) {
    return this.request.get(ENDPOINTS.contacts, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  /** DELETE /contacts/:id */
  async deleteContact(token, id) {
    return this.request.delete(ENDPOINTS.contactById(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

module.exports = { ApiClient };