import api from "./api";

export const aparaturService = {
  async getAllAparatur() {
    try {
      const response = await api.get("/api/aparatur");

      return response?.data?.data || [];
    } catch (error) {
      console.error("getAllAparatur:", error);

      return [];
    }
  },

  async getAparaturById(id) {
    try {
      const response = await api.get(`/api/aparatur/${id}`);

      return response?.data?.data || null;
    } catch (error) {
      console.error("getAparaturById:", error);

      return null;
    }
  },

  async createAparatur(formData) {
    try {
      const response = await api.post("/api/aparatur", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal menambah aparatur",
        {
          cause: error,
        },
      );
    }
  },

  async updateAparatur(id, formData) {
    try {
      const response = await api.put(`/api/aparatur/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal memperbarui aparatur",
        {
          cause: error,
        },
      );
    }
  },

  async deleteAparatur(id) {
    try {
      const response = await api.delete(`/api/aparatur/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal menghapus aparatur",
        {
          cause: error,
        },
      );
    }
  },
};
