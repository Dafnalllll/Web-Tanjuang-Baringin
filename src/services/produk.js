import api from "./api";

export const produkService = {
  async getAllProduk() {
    try {
      const response = await api.get("/api/produk");

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data produk",
        {
          cause: error,
        },
      );
    }
  },

  async getProdukById(id) {
    try {
      const response = await api.get(`/api/produk/${id}`);

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil detail produk",
        {
          cause: error,
        },
      );
    }
  },

  async createProduk(formData) {
    try {
      const response = await api.post("/api/produk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal menambah produk",
        {
          cause: error,
        },
      );
    }
  },

  async updateProduk(id, formData) {
    try {
      const response = await api.put(`/api/produk/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengupdate produk",
        {
          cause: error,
        },
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
        {
          cause: error,
        },
      );
    }
  },
};
