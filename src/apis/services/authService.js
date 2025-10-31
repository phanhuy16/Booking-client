// src/api/services/authService.js
import axiosClient from "../axiosClient";
import endpoints from "../endpoints";

const authService = {
  // Patient Registration
  registerPatient: async (data) => {
    const res = await axiosClient.post(endpoints.auth.patientRegister, data);
    return res.data;
  },

  // Doctor Registration
  registerDoctor: async (data) => {
    const res = await axiosClient.post(endpoints.auth.doctorRegister, data);
    return res.data;
  },

  // Verify Email (for both Patient and Doctor)
  verifyEmail: async (data) => {
    const res = await axiosClient.post(endpoints.auth.verifyEmail, data);
    return res.data;
  },

  // Login (for both Patient and Doctor)
  login: async (data) => {
    const res = await axiosClient.post(endpoints.auth.login, data);
    return res.data;
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    const res = await axiosClient.post(endpoints.auth.refreshToken, {
      refreshToken,
    });
    return res.data;
  },

  // Google Login
  googleLogin: async (idToken) => {
    const res = await axiosClient.post(endpoints.auth.googleLogin, {
      idToken,
    });
    return res.data;
  },

  // Send OTP
  sendOtp: async (email) => {
    const res = await axiosClient.post(endpoints.auth.sendOtp, {
      email,
    });
    return res.data;
  },

  // Resend Verification
  resendVerification: async (email) => {
    const res = await axiosClient.post(endpoints.auth.resendVerification, {
      email,
    });
    return res.data;
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const res = await axiosClient.post(endpoints.auth.forgotPassword, {
      email,
    });
    return res.data;
  },

  // Reset Password
  resetPassword: async (data) => {
    const res = await axiosClient.post(endpoints.auth.resetPassword, data);
    return res.data;
  },

  // Logout
  logout: async () => {
    const res = await axiosClient.post(endpoints.auth.logout);
    return res.data;
  },
};

export default authService;