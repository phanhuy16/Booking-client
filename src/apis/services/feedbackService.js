// src/api/services/feedbackService.js
import axiosClient from "../axiosClient";
import endpoints from "../endpoints";

const feedbackService = {
  // Get feedbacks by doctor ID
  getByDoctor: async (doctorId) => {
    try {
      const response = await axiosClient.get(endpoints.feedbacks.getByDoctor(doctorId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching feedbacks for doctor ${doctorId}:`, error);
      throw error;
    }
  },

  // Get feedback by ID
  getById: async (id) => {
    try {
      const response = await axiosClient.get(endpoints.feedbacks.getById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching feedback ${id}:`, error);
      throw error;
    }
  },
  // Create new feedback
  create: async (feedbackData) => {
    try {
      const response = await axiosClient.post(endpoints.feedbacks.create, feedbackData);
      return response.data;
    } catch (error) {
      console.error("Error creating feedback:", error);
      throw error;
    }
  },
  // Update feedback
  update: async (id, feedbackData) => {
    try {
      const response = await axiosClient.put(endpoints.feedbacks.update(id), feedbackData);
      return response.data;
    } catch (error) {
      console.error(`Error updating feedback ${id}:`, error);
      throw error;
    }
  },
  // Delete feedback
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(endpoints.feedbacks.delete(id));
      return response.data;
    } catch (error) {
      console.error(`Error deleting feedback ${id}:`, error);
      throw error;
    }
  },
};

export default feedbackService;