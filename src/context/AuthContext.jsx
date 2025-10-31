// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useRef } from "react";
import authService from "../apis/services/authService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshTimeoutRef = useRef(null);

  // Helper: Kiểm tra token có hết hạn không
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Token decode error:", error);
      return true;
    }
  };

  // Helper: Lấy thời gian còn lại của token (giây)
  const getTokenTimeRemaining = (token) => {
    if (!token) return 0;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return Math.max(0, decoded.exp - currentTime);
    } catch (error) {
      console.error("Token decode error:", error);
      return 0;
    }
  };

  // Refresh token function
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      logout();
      return false;
    }

    try {
      const res = await authService.refreshToken(refreshToken);

      if (res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        // ⭐ Lưu thông tin user đầy đủ
        const userData = {
          userName: res.userName,
          fullName: res.fullName,
          email: res.email,
          roles: res.roles || [],
          patientProfileId: res.patientProfileId,
          doctorProfileId: res.doctorProfileId,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);

        // Schedule next refresh
        scheduleTokenRefresh(res.accessToken);

        return true;
      }

      return false;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
      return false;
    }
  };

  // Schedule automatic token refresh
  const scheduleTokenRefresh = (token) => {
    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    const timeRemaining = getTokenTimeRemaining(token);

    if (timeRemaining <= 0) {
      refreshAccessToken();
      return;
    }

    // Refresh token 2 phút trước khi hết hạn
    const refreshTime = Math.max(0, (timeRemaining - 120) * 1000);

    refreshTimeoutRef.current = setTimeout(() => {
      refreshAccessToken();
    }, refreshTime);
  };

  // Kiểm tra token khi load app
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("userData");

      if (!token) {
        setLoading(false);
        return;
      }

      // Kiểm tra token có hết hạn không
      if (isTokenExpired(token)) {
        const refreshed = await refreshAccessToken();

        if (!refreshed) {
          logout();
        }
      } else {
        // Load user data
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (err) {
            console.error("Parse user data error:", err);
          }
        }

        // Schedule refresh
        scheduleTokenRefresh(token);
      }

      setLoading(false);
    };

    initAuth();

    // Cleanup
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authService.login({ email, password });

      if (res.success) {
        // Lưu tokens
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        // ⭐ Lưu thông tin user đầy đủ bao gồm patientProfileId
        const userData = {
          userName: res.userName,
          fullName: res.fullName,
          email: res.email,
          roles: res.roles || [],
          patientProfileId: res.patientProfileId,
          doctorProfileId: res.doctorProfileId,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);

        // Schedule token refresh
        scheduleTokenRefresh(res.accessToken);
      }

      return res;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Đăng nhập thất bại";
      console.log("Login error:", errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Register Patient
  const registerPatient = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authService.registerPatient(data);
      return res;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Đăng ký thất bại";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register Doctor
  const registerDoctor = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authService.registerDoctor(data);
      return res;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Đăng ký thất bại";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verify Email (OTP)
  const verifyEmail = async (email, otpCode) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authService.verifyEmail({ email, otpCode });

      if (res.success && res.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        // ⭐ Lưu thông tin user đầy đủ
        const userData = {
          userName: res.userName,
          fullName: res.fullName,
          email: res.email,
          roles: res.roles || [],
          patientProfileId: res.patientProfileId,
          doctorProfileId: res.doctorProfileId,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);

        scheduleTokenRefresh(res.accessToken);
      }

      return res;
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0] || "Xác thực thất bại";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async (email) => {
    try {
      const res = await authService.resendVerification(email);
      return res;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Gửi lại OTP thất bại";
      setError(errorMsg);
      throw err;
    }
  };

  // Google Login
  const googleLogin = async (idToken) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authService.googleLogin(idToken);

      if (res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        // ⭐ Lưu thông tin user đầy đủ
        const userData = {
          userName: res.userName,
          fullName: res.fullName,
          email: res.email,
          roles: res.roles || [],
          patientProfileId: res.patientProfileId,
          doctorProfileId: res.doctorProfileId,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);

        scheduleTokenRefresh(res.accessToken);
      }

      return res;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Đăng nhập Google thất bại";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    localStorage.clear();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    registerPatient,
    registerDoctor,
    verifyEmail,
    resendOtp,
    googleLogin,
    logout,
    setError,
    refreshAccessToken,
    // ⭐ Helper methods
    isAuthenticated: !!user,
    isPatient: user?.roles?.includes("Patient"),
    isDoctor: user?.roles?.includes("Doctor"),
    isAdmin: user?.roles?.includes("Admin"),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
