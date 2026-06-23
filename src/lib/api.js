const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create a fetch-based API client
export const API = {
  async get(endpoint, options = {}) {
    // Ensure endpoint starts with /api
    const fullEndpoint = endpoint.startsWith("/api")
      ? endpoint
      : `/api${endpoint}`;
    const url = `${BASE_URL}${fullEndpoint}`;

    if (options.params) {
      const urlObj = new URL(url);
      Object.entries(options.params).forEach(([key, value]) => {
        urlObj.searchParams.append(key, value);
      });
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return { data: await response.json() };
  },

  async post(endpoint, data = {}, options = {}) {
    // Ensure endpoint starts with /api
    const fullEndpoint = endpoint.startsWith("/api")
      ? endpoint
      : `/api${endpoint}`;
    const url = `${BASE_URL}${fullEndpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return { data: await response.json() };
  },

  async put(endpoint, data = {}, options = {}) {
    // Ensure endpoint starts with /api
    const fullEndpoint = endpoint.startsWith("/api")
      ? endpoint
      : `/api${endpoint}`;
    const url = `${BASE_URL}${fullEndpoint}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return { data: await response.json() };
  },

  async delete(endpoint, options = {}) {
    // Ensure endpoint starts with /api
    const fullEndpoint = endpoint.startsWith("/api")
      ? endpoint
      : `/api${endpoint}`;
    const url = `${BASE_URL}${fullEndpoint}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return { data: await response.json() };
  },
};

// Export BASE_URL for direct fetch calls if needed
export const BASE_API_URL = BASE_URL;
