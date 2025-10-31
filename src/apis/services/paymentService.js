import axiosClient from "../axiosClient";
import endpoints from "../endpoints";

const paymentService = {
  // Get payment by booking ID
  getByBooking: async (bookingId) => {
    try {
      const response = await axiosClient.get(
        endpoints.payments.getByBooking(bookingId)
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment for booking ${bookingId}:`, error);
      throw error;
    }
  },

  // Get payments by patient
  getByPatient: async (patientId) => {
    try {
      const response = await axiosClient.get(
        endpoints.payments.getByPatient(patientId)
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching payments for patient ${patientId}:`, error);
      throw error;
    }
  },

  // Create payment
  create: async (paymentData) => {
    try {
      const response = await axiosClient.post(
        endpoints.payments.create,
        paymentData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  // Update payment status
  updateStatus: async (id, status) => {
    try {
      const response = await axiosClient.put(
        endpoints.payments.updateStatus(id),
        { status }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating payment status ${id}:`, error);
      throw error;
    }
  },
};

export default paymentService;