import api from "./api";

/* ─── Service Produk Nagari ───
   Mengikuti pola services/faq.js.
   Endpoint default /api/produk — sesuaikan bila backend sudah tersedia. */

export const produkService = {
  async getAllProduk() {
    try {
      const response = await api.get("/api/produk");

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data produk",
        { cause: error },
      );
    }
  },

  async getPublicProduk() {
    try {
      const response = await api.get("/api/produk/publik");

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data produk publik",
        { cause: error },
      );
    }
  },

  async createProduk(data) {
    try {
      const response = await api.post("/api/produk", data);

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal menambah produk",
        { cause: error },
      );
    }
  },

  async updateProduk(id, data) {
    try {
      const response = await api.put(`/api/produk/${id}`, data);

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengupdate produk",
        { cause: error },
      );
    }
  },

  async deleteProduk(id) {
    try {
      const response = await api.delete(`/api/produk/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal menghapus produk",
        { cause: error },
      );
    }
  },
};
