import axios from "axios";

class API {
  constructor() {
    this.baseURL = "https://api.kounto.ai/api"; //  "https://api.kounto.ai/api";
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    } else {
      this.token = null;
    }
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `${this.token}`,
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  auth = {
    register: async (data) => {
      try {
        const response = await this.axiosInstance.post("/auth/register", data);
        if (response && response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        return response.data;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    login: async (data) => {
      try {
        const response = await this.axiosInstance.post("/auth/login", data);
        if (response && response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        return response.data;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
  };

  quickbooks = {
    auth: (id) => {
      try {
        return this.axiosInstance.get(`/quickbooks/auth?id=${id}`);
      } catch (error) {
        console.error(error);
      }
    },
  };

  company = {
    get: (id) => this.axiosInstance.get(`/companies/${id}`),
    list: () => this.axiosInstance.get("/companies/"),
    create: (data) => this.axiosInstance.post("/companies/", data),
  };

  integrations = {
    create: (companyId, data) =>
      this.axiosInstance.post(`/companies/${companyId}/integrations`, data),
    get: (companyId, id) =>
      this.axiosInstance.get(`/companies/${companyId}/integrations/${id}`),
    list: (companyId) =>
      this.axiosInstance.get(`/companies/${companyId}/integrations`),
    update: (companyId, id, data) =>
      this.axiosInstance.put(
        `/companies/${companyId}/integrations/${id}`,
        data,
      ),
    delete: (companyId, id) =>
      this.axiosInstance.delete(`/companies/${companyId}/integrations/${id}`),
  };

  customers = {
    create: (companyId, data) =>
      this.axiosInstance.post(`/companies/${companyId}/customers`, data),
    get: (companyId, id) =>
      this.axiosInstance.get(`/companies/${companyId}/customers/${id}`),
    list: (companyId, page, limit) =>
      this.axiosInstance.get(`/companies/${companyId}/customers`, {
        params: { page, limit },
      }),
    update: (companyId, id, data) =>
      this.axiosInstance.put(`/companies/${companyId}/customers/${id}`, data),
    delete: (companyId, id) =>
      this.axiosInstance.delete(`/companies/${companyId}/customers/${id}`),
  };

  vendors = {
    create: (companyId, data) =>
      this.axiosInstance.post(`/companies/${companyId}/vendors`, data),
    get: (companyId, id) =>
      this.axiosInstance.get(`/companies/${companyId}/vendors/${id}`),
    list: (companyId, page, limit) =>
      this.axiosInstance.get(`/companies/${companyId}/vendors`, {
        params: { page, limit },
      }),
    update: (companyId, id, data) =>
      this.axiosInstance.put(`/companies/${companyId}/vendors/${id}`, data),
    delete: (companyId, id) =>
      this.axiosInstance.delete(`/companies/${companyId}/vendors/${id}`),
  };

  accounts = {
    create: (data) => this.axiosInstance.post("/accounts/", data),
    get: (id) => this.axiosInstance.get(`/accounts/${id}`),
    list: () => this.axiosInstance.get("/accounts/"),
    update: (id, data) => this.axiosInstance.put(`/accounts/${id}`, data),
    delete: (id) => this.axiosInstance.delete(`/accounts/${id}`),
  };

  documents = {
    create: (companyId, data) =>
      this.axiosInstance.post(`/companies/${companyId}/documents`, data),
    get: (companyId, id) =>
      this.axiosInstance.get(`/companies/${companyId}/documents/${id}`),
    list: (companyId, params) =>
      this.axiosInstance.get(`/companies/${companyId}/documents`, {
        params,
      }),
    stats: (companyId, type) =>
      this.axiosInstance.get(`/companies/${companyId}/documentstats`, {
        params: { type },
      }),
    upload: (companyId, data) => {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("type", data.type);
      return this.axiosInstance.post(
        `/companies/${companyId}/documents/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
    },
  };

  invoices = {
    create: (companyId, data) =>
      this.axiosInstance.post(`/companies/${companyId}/invoices`, data),
    get: (companyId, id) =>
      this.axiosInstance.get(`/companies/${companyId}/invoices/${id}`),
    list: (companyId, params) =>
      this.axiosInstance.get(`/companies/${companyId}/invoices/`, { params }),
    update: (companyId, id, data) =>
      this.axiosInstance.put(`/companies/${companyId}/invoices/${id}`, data),
    updateMissingItems: (companyId, id, data) =>
      this.axiosInstance.put(
        `/companies/${companyId}/missing/invoices/${id}`,
        data,
      ),
    delete: (companyId, id) =>
      this.axiosInstance.delete(`/companies/${companyId}/invoices/${id}`),
  };

  expenses = {
    create: (companyId, data) =>
      this.axiosInstance.post(`/companies/${companyId}/expenses`, data),
    get: (companyId, id) =>
      this.axiosInstance.get(`/companies/${companyId}/expenses/${id}`),
    list: (companyId, params) =>
      this.axiosInstance.get(`/companies/${companyId}/expenses/`, { params }),
    update: (companyId, id, data) =>
      this.axiosInstance.put(`/companies/${companyId}/expenses/${id}`, data),
    updateMissingItems: (companyId, id, data) =>
      this.axiosInstance.put(
        `/companies/${companyId}/missing/expenses/${id}`,
        data,
      ),
  };

  subscription = {
    getPlans: () => this.axiosInstance.get("/account/subscription/plans"),
    getHistory: () => this.axiosInstance.get("/account/subscription/history"),

    startTrial: (cardToken) =>
      this.axiosInstance.post("/account/subscription/start-trial", {
        cardToken,
      }),

    changePlan: (priceId) =>
      this.axiosInstance.post("/account/subscription/change-plan", { priceId }),
  };

  account = {
    get: () => this.axiosInstance.get("/account"),
    update: (data) => this.axiosInstance.put("/account", data),
  };

  dashboard = {
    get: () => this.axiosInstance.get("/dashboard-data"),
  };

  aiChat = {
    post: (data) => this.axiosInstance.post("/ai-chat", data),
  };

  chatHistoryPreview = {
    get: () => this.axiosInstance.get("/chat-history-preview"),
  };

  chatData = {
    get: (chatId) => this.axiosInstance.get(`/chat-data/${chatId}`),
  };
}
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("api", new API());
});
