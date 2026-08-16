import api from "./api";

export const faq = {
  async getAllFaqs() {
    try {
      const response = await api.get("/api/faq/all");

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data FAQ",
        { cause: error },
      );
    }
  },

  async getPublicFaqs() {
    try {
      const response = await api.get("/api/faq");

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data FAQ publik",
        { cause: error },
      );
    }
  },

  async createFaq(formData) {
    try {
      const response = await api.post("/api/faq", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengirim pengaduan",
        { cause: error },
      );
    }
  },

  async updateFaq(id, data) {
    try {
      const response = await api.put(`/api/faq/${id}`, data);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Gagal mengupdate FAQ", {
        cause: error,
      });
    }
  },

  async deleteFaq(id) {
    try {
      const response = await api.delete(`/api/faq/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Gagal menghapus FAQ", {
        cause: error,
      });
    }
  },
};
