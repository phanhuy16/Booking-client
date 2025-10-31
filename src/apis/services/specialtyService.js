import axiosClient from "../axiosClient";
import endpoints from "../endpoints";

const specialtyService = {
  // Get all specialties
  getAll: async () => {
    try {
      const response = await axiosClient.get(endpoints.specialties.getAll);
      return response.data;
    } catch (error) {
      console.error('Error fetching specialties:', error);
      throw error;
    }
  },

  // Get specialty by ID
  getById: async (id) => {
    try {
      const response = await axiosClient.get(endpoints.specialties.getById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching specialty ${id}:`, error);
      throw error;
    }
  },

  // Get doctors by specialty with filters
  getDoctorsBySpecialty: async (id, params = {}) => {
    try {
      const response = await axiosClient.get(
        endpoints.specialties.getDoctorsBySpecialty(id),
        {
          params: {
            page: params.page || 1,
            pageSize: params.pageSize || 10,
            sortBy: params.sortBy || 'rating',
            order: params.order || 'desc',
            minRating: params.minRating || null,
            minExperience: params.minExperience || null,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctors for specialty ${id}:`, error);
      throw error;
    }
  },
};

export default specialtyService;