const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const api = {
  // Auth endpoints
  auth: {
    register: async (email: string, password: string, name: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      return response.json();
    },

    login: async (email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    },

    getProfile: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
  },

  // WhatsApp endpoints
  whatsapp: {
    createInstance: async (token: string, instanceName: string) => {
      const response = await fetch(`${API_BASE_URL}/whatsapp/instances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ instanceName }),
      });
      return response.json();
    },

    getInstances: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/whatsapp/instances`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },

    sendMessage: async (token: string, instanceId: string, phoneNumber: string, message: string) => {
      const response = await fetch(`${API_BASE_URL}/whatsapp/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ instanceId, phoneNumber, message }),
      });
      return response.json();
    },

    getMessages: async (token: string, instanceId?: string) => {
      const url = new URL(`${API_BASE_URL}/whatsapp/messages`);
      if (instanceId) url.searchParams.append('instanceId', instanceId);
      
      const response = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
  },
};
