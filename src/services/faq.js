const API_URL = "http://localhost:3001/api/faq";

export const faqService = {
  async getAllFaqs() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengambil data FAQ");
    }

    return result.data;
  },

  /* FAQ publik (tanpa token) — hanya yang sudah dijawab */
  async getPublicFaqs() {
    const response = await fetch(API_URL);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengambil data FAQ publik");
    }

    return result.data;
  },

  async createFaq(formData) {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengirim pengaduan");
    }

    return result;
  },

  async updateFaq(id, data) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  async deleteFaq(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },
};
