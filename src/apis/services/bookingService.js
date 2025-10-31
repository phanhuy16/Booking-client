import axiosClient from '../axiosClient';
import endpoints from '../endpoints';

const bookingService = {
  // Get all bookings
  getAll: async () => {
    try {
      const response = await axiosClient.get(endpoints.bookings.getAll);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get booking by ID
  getById: async (id) => {
    try {
      const response = await axiosClient.get(endpoints.bookings.getById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error);
      throw error;
    }
  },

  // Create new booking
  create: async (bookingData) => {
    try {
      const response = await axiosClient.post(endpoints.bookings.create, bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Update booking status
  updateStatus: async (id, status) => {
    try {
      const response = await axiosClient.put(
        endpoints.bookings.updateStatus(id),
        { status }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating booking status ${id}:`, error);
      throw error;
    }
  },

  // Delete booking
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(endpoints.bookings.delete(id));
      return response.data;
    } catch (error) {
      console.error(`Error deleting booking ${id}:`, error);
      throw error;
    }
  },
};

export default bookingService;
