import api from "./api";

export const galeriService = {
  async getAllGaleri(kategori = "all") {
    try {
      const response = await api.get("/api/galeri", {
        params: {
          kategori,
        },
      });

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data galeri",
        {
          cause: error,
        },
      );
    }
  },

  async getGaleriById(id) {
    try {
      const response = await api.get(`/api/galeri/${id}`);

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil detail galeri",
        {
          cause: error,
        },
      );
    }
  },

  async getKategoriGaleri() {
    try {
      const response = await api.get("/api/galeri/kategori");

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil kategori galeri",
        {
          cause: error,
        },
      );
    }
  },

  async createGaleri(formData) {
    try {
      const response = await api.post("/api/galeri", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal menambah galeri",
        {
          cause: error,
        },
      );
    }
  },

  async updateGaleri(id, formData) {
    try {
      const response = await api.put(`/api/galeri/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal memperbarui galeri",
        {
          cause: error,
        },
      );
    }
  },

  async deleteGaleri(id) {
    try {
      const response = await api.delete(`/api/galeri/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal menghapus galeri",
        {
          cause: error,
        },
      );
    }
  },
};
