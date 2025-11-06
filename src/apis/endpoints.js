
const endpoints = {
  auth: {
    // Patient endpoints
    patientRegister: '/auth/patient/register',

    // Doctor endpoints
    doctorRegister: '/auth/doctor/register',

    // Common endpoints
    verifyEmail: '/auth/verify-email',
    login: '/auth/login',
    refreshToken: '/auth/refresh-token',
    googleLogin: '/auth/login/google',

    // OTP endpoints
    sendOtp: '/auth/otp/send',
    resendVerification: '/auth/resend-verification',

    // Password reset
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',

    // Logout
    logout: '/auth/logout',
  },

  // Doctor endpoints
  doctors: {
    getAll: '/doctors',
    getById: (id) => `/doctors/${id}`,
    getDetails: (id) => `/doctors/${id}/details`,
    getAvailableSchedules: (id) => `/doctors/${id}/available-schedules`,
  },

  // Specialty endpoints
  specialties: {
    getAll: '/specialties',
    getById: (id) => `/specialties/${id}`,
    getDoctorsBySpecialty: (id) => `/specialties/${id}/doctors`,
  },

  // Booking endpoints
  bookings: {
    getAll: '/bookings',
    getById: (id) => `/bookings/${id}`,
    getMyBookings: (status) => `/bookings/my-bookings/${status ? `?status=${status}` : ''}`,
    getCompletedForFeedback: '/bookings/completed-for-feedback',
    create: '/bookings',
    updateStatus: (id) => `/bookings/${id}/status`,
    delete: (id) => `/bookings/${id}`,
  },

  // Schedule endpoints
  schedules: {
    getAll: '/schedules/admin',
    getById: (id) => `/schedules/${id}`,
    getByDoctor: (doctorId) => `/schedules/doctor/${doctorId}`,
    getAvailableByDoctor: (doctorId) => `/schedules/doctor/${doctorId}/available`,
  },

  // Service endpoints
  services: {
    getAll: '/services',
    getById: (id) => `/services/${id}`,
  },

  // Payment endpoints
  payments: {
    getByBooking: (bookingId) => `/payments/booking/${bookingId}`,
    getByPatient: (patientId) => `/payments/patient/${patientId}`,
    create: '/payments',
    updateStatus: (id) => `/payments/admin/${id}/status`,
  },

  // Feedback endpoints
  feedbacks: {
    getByDoctor: (doctorId) => `/feedbacks/doctor/${doctorId}`,
    getById: (id) => `/feedbacks/${id}`,
    create: '/feedbacks',
    update: (id) => `/feedbacks/${id}`,
    delete: (id) => `/feedbacks/${id}`,
  },
};

export default endpoints;