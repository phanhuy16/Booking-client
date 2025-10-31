// src/pages/login/Login.jsx
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  LocalHospital,
} from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";
  const { login, loading, error: authError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const validationRules = {
    email: {
      required: "Email là bắt buộc",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email không hợp lệ",
      },
    },
    password: {
      required: "Mật khẩu là bắt buộc",
      minLength: {
        value: 6,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      },
    },
  };

  const { values, errors, touched, handleChange, handleBlur, validateForm } =
    useForm(
      {
        email: "",
        password: "",
      },
      validationRules
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await login(values.email, values.password);
      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left Side - Form */}
          <div className="col-lg-6 col-md-12 auth-form-section">
            <div className="auth-form-wrapper">
              {/* Logo & Brand */}
              <div className="auth-brand">
                <LocalHospital className="brand-icon" />
                <Typography variant="h4" className="brand-name">
                  MediCare
                </Typography>
                <Typography variant="body2" className="brand-tagline">
                  Hệ thống đặt lịch khám bệnh trực tuyến
                </Typography>
              </div>

              {/* Form Header */}
              <div className="auth-header">
                <Typography variant="h5" className="auth-title">
                  Đăng nhập
                </Typography>
                <Typography variant="body2" className="auth-subtitle">
                  Chào mừng bạn quay trở lại! Vui lòng đăng nhập để tiếp tục.
                </Typography>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="auth-form">
                {/* Error Alert */}
                {authError && (
                  <Alert severity="error" className="mb-3">
                    {authError}
                  </Alert>
                )}

                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  placeholder="example@email.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  className="mb-3"
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  placeholder="••••••••"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className="mb-3"
                />

                {/* Forgot Password Link */}
                <div className="text-end mb-3">
                  <Link to="/forgot-password" className="forgot-password-link">
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  className="auth-submit-btn"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>

                {/* Divider */}
                <Divider className="my-4">
                  <Typography variant="body2" color="textSecondary">
                    Hoặc
                  </Typography>
                </Divider>

                {/* Google Login Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  className="google-auth-btn"
                  startIcon={
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      style={{ width: 20, height: 20 }}
                    />
                  }
                >
                  Đăng nhập với Google
                </Button>

                {/* Register Link */}
                <Box className="auth-footer-link">
                  <Typography variant="body2" color="textSecondary">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="register-link">
                      Đăng ký ngay
                    </Link>
                  </Typography>
                </Box>
              </form>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="col-lg-6 d-none d-lg-block auth-image-section">
            <div className="auth-image-overlay">
              <div className="auth-image-content">
                <Typography variant="h3" className="image-title">
                  Chăm sóc sức khỏe của bạn
                </Typography>
                <Typography variant="h6" className="image-subtitle">
                  Đặt lịch khám bệnh dễ dàng, nhanh chóng và tiện lợi
                </Typography>
                <div className="image-features">
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <div className="feature-text">Đặt lịch 24/7</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <div className="feature-text">Bác sĩ chuyên khoa</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <div className="feature-text">Tư vấn trực tuyến</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
