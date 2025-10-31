import axiosClient from "../axiosClient";
import endpoints from "../endpoints";

const serviceManager = {
  // Get all services
  getAll: async () => {
    try {
      const response = await axiosClient.get(endpoints.services.getAll);
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by ID
  getById: async (id) => {
    try {
      const response = await axiosClient.get(endpoints.services.getById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw error;
    }
  },
};

export default serviceManager;