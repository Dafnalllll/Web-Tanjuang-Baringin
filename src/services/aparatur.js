import api from "./api";

export const aparaturService = {
  async getAllAparatur() {
    try {
      const response = await api.get("/api/aparatur");

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data aparatur",
        {
          cause: error,
        },
      );
    }
  },

  async getAparaturById(id) {
    try {
      const response = await api.get(`/api/aparatur/${id}`);

      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil detail aparatur",
        {
          cause: error,
        },
      );
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
