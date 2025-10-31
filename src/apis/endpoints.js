// // src/api/endpoints.js

// const BASE_URL = import.meta.env.VITE_API_URL;

// const endpoints = {
//   auth: {
//     // Patient endpoints
//     patientRegister: `${BASE_URL}/auth/patient/register`,

//     // Doctor endpoints
//     doctorRegister: `${BASE_URL}/auth/doctor/register`,

//     // Common endpoints
//     verifyEmail: `${BASE_URL}/auth/verify-email`,
//     login: `${BASE_URL}/auth/login`,
//     refreshToken: `${BASE_URL}/auth/refresh-token`,
//     googleLogin: `${BASE_URL}/auth/login/google`,

//     // OTP endpoints
//     sendOtp: `${BASE_URL}/auth/otp/send`,
//     resendVerification: `${BASE_URL}/auth/resend-verification`,

//     // Password reset
//     forgotPassword: `${BASE_URL}/auth/forgot-password`,
//     resetPassword: `${BASE_URL}/auth/reset-password`,

//     // Logout
//     logout: `${BASE_URL}/auth/logout`,
//   },

//   // Doctor endpoints
//   doctors: {
//     getAll: `${BASE_URL}/doctors`,
//     getById: (id) => `${BASE_URL}/doctors/${id}`,
//     getDetails: (id) => `${BASE_URL}/doctors/${id}/details`,
//     getAvailableSchedules: (id) => `${BASE_URL}/doctors/${id}/available-schedules`,
//   },

//   // Specialty endpoints
//   specialties: {
//     getAll: `${BASE_URL}/specialties`,
//     getById: (id) => `${BASE_URL}/specialties/${id}`,
//     getDoctorsBySpecialty: (id) => `${BASE_URL}/specialties/${id}/doctors`,
//   },

//   // Booking endpoints
//   bookings: {
//     getAll: `${BASE_URL}/bookings`,
//     getById: (id) => `${BASE_URL}/bookings/${id}`,
//     create: `${BASE_URL}/bookings`,
//     updateStatus: (id) => `${BASE_URL}/bookings/${id}/status`,
//     delete: (id) => `${BASE_URL}/bookings/${id}`,
//   },

//   // Schedule endpoints
//   schedules: {
//     getAll: `${BASE_URL}/schedules/admin`,
//     getById: (id) => `${BASE_URL}/schedules/${id}`,
//     getByDoctor: (doctorId) => `${BASE_URL}/schedules/doctor/${doctorId}`,
//     getAvailableByDoctor: (doctorId) => `${BASE_URL}/schedules/doctor/${doctorId}/available`,
//   },

//   // Service endpoints
//   services: {
//     getAll: `${BASE_URL}/services`,
//     getById: (id) => `${BASE_URL}/services/${id}`,
//   },

//   // Payment endpoints
//   payments: {
//     getByBooking: (bookingId) => `${BASE_URL}/payments/booking/${bookingId}`,
//     getByPatient: (patientId) => `${BASE_URL}/payments/patient/${patientId}`,
//     create: `${BASE_URL}/payments`,
//     updateStatus: (id) => `${BASE_URL}/payments/admin/${id}/status`,
//   },
// };

// export default endpoints;
// src/api/endpoints.js

// ✅ KHÔNG cần BASE_URL vì axiosClient đã có baseURL
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
};

export default endpoints;