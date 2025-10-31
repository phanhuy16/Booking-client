import axiosClient from "../axiosClient";
import endpoints from "../endpoints";

const doctorService = {
  // Get all doctors (simple - for Home page)
  getAll: async (params = {}) => {
    try {
      const response = await axiosClient.get(endpoints.doctors.getAll, {
        params: {
          specialty: params.specialty || null,
          _start: params._start || 0,
          _end: params._end || 10,
          _sort: params._sort || 'Id',
          _order: params._order || 'ASC',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  // Get doctor by ID
  getById: async (id) => {
    try {
      const response = await axiosClient.get(endpoints.doctors.getById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor ${id}:`, error);
      throw error;
    }
  },

  // Get doctor with full details
  getDetails: async (id) => {
    try {
      const response = await axiosClient.get(endpoints.doctors.getDetails(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor details ${id}:`, error);
      throw error;
    }
  },

  // Get available schedules for a doctor
  getAvailableSchedules: async (id) => {
    try {
      const response = await axiosClient.get(endpoints.doctors.getAvailableSchedules(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedules for doctor ${id}:`, error);
      throw error;
    }
  },
};

export default doctorService;