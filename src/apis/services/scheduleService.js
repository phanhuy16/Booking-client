import axiosClient from "../axiosClient";
import endpoints from "../endpoints";

const scheduleService = {
  // Get all schedules
  getAll: async () => {
    try {
      const response = await axiosClient.get(endpoints.schedules.getAll);
      return response.data;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }
  },

  // Get schedule by ID
  getById: async (id) => {
    try {
      const response = await axiosClient.get(endpoints.schedules.getById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedule ${id}:`, error);
      throw error;
    }
  },

  // Get schedules by doctor
  getByDoctor: async (doctorId) => {
    try {
      const response = await axiosClient.get(endpoints.schedules.getByDoctor(doctorId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedules for doctor ${doctorId}:`, error);
      throw error;
    }
  },

  // Get available schedules by doctor
  getAvailableByDoctor: async (doctorId) => {
    try {
      const response = await axiosClient.get(
        endpoints.schedules.getAvailableByDoctor(doctorId)
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching available schedules for doctor ${doctorId}:`, error);
      throw error;
    }
  },
};

export default scheduleService;