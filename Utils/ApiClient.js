const axios = require('axios');

class ApiClient {
  constructor(dataPlaneUrl, writeKey) {
    this.url = dataPlaneUrl;   // Base URL, e.g. https://ahvinfetokvzds.dataplane.rudderstack.com
    this.writeKey = writeKey;  // Write key for Authorization
  }

  async post(path, payload) {
    const fullUrl = `${this.url}${path}`;  // Combine base URL and endpoint path

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(this.writeKey + ':').toString('base64')}`,
    };

    try {
      const response = await axios.post(fullUrl, payload, { headers });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { ApiClient };