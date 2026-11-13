const BASE_URL = 'https://jsonplaceholder.typicode.com';
let currentController = null;

export const apiService = {
  async getItems(endpoint = '/posts') {
    if (currentController) currentController.abort();
    currentController = new AbortController();

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: currentController.signal
      });

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') return null;
      throw error;
    } finally {
      currentController = null;
    }
  },

  async createItem(endpoint = '/posts', payload) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`No se pudo completar la operación`);
    return await response.json();
  }
};