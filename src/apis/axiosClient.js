import axios from 'axios';
import endpoints from "./endpoints";

const API_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor: Thêm token vào headers
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Xử lý lỗi 401 và refresh token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('⚠️ Response Error:', error.response?.status, originalRequest.url);
    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('🔄 Detecting 401 - Access token might be expired');
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          console.log('🔑 Attempting to refresh token...');
          console.log('📍 Refresh Token:', refreshToken.substring(0, 20) + '...');
          // Gọi API refresh token
          const res = await axios.post(
            endpoints.auth.refreshToken,
            {
              refreshToken: refreshToken  // Backend expect này
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
          console.log('✅ Token refreshed successfully!');
          const { accessToken, refreshToken: newRefreshToken } = res.data;
          console.log('💾 Saving new tokens to localStorage');
          console.log('📍 New Access Token:', accessToken.substring(0, 20) + '...');
          console.log('📍 New Refresh Token:', newRefreshToken.substring(0, 20) + '...');
          // Lưu token mới
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Retry request ban đầu với token mới
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          console.log('🔁 Retrying original request with new token...');
          return axiosClient(originalRequest);
        } catch (err) {
          console.error('❌ Refresh token failed:', err.response?.data || err.message);
          console.log('🚪 Logging out user...');
          // Refresh token thất bại -> logout
          console.error("Refresh token failed:", err);
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(err);
        }
      } else {
        // Không có refresh token -> logout
        console.warn('⚠️ No refresh token found in localStorage');
        console.log('🚪 Redirecting to login...');
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
