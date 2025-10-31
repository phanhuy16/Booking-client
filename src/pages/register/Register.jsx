// src/pages/register/Register.jsx
import {
  Email,
  LocalHospital,
  Lock,
  MedicalServices,
  Person,
  PersonOutline,
  Visibility,
  VisibilityOff,
  Phone,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpVerificationDialog from "../../components/OtpVerificationDialog";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

const Register = () => {
  const navigate = useNavigate();
  const {
    registerPatient,
    registerDoctor,
    verifyEmail,
    resendOtp,
    loading,
    error: authError,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("patient"); // 'patient' or 'doctor'
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const validationRules = {
    fullName: {
      required: "Họ tên là bắt buộc",
      minLength: {
        value: 2,
        message: "Họ tên phải có ít nhất 2 ký tự",
      },
    },
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
    confirmPassword: {
      required: "Xác nhận mật khẩu là bắt buộc",
      validate: (value, allValues) => {
        if (value !== allValues.password) {
          return "Mật khẩu xác nhận không khớp";
        }
        return "";
      },
    },
  };

  const { values, errors, touched, handleChange, handleBlur, validateForm } =
    useForm(
      {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationRules
    );

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const registerData = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };

      // Call appropriate register function based on role
      const result =
        role === "patient"
          ? await registerPatient(registerData)
          : await registerDoctor({
              name: values.fullName,
              email: values.email,
              phone: values.phone,
              password: values.password,
            });

      if (result.success) {
        setRegisteredEmail(values.email);
        setShowOtpDialog(true);
      }
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  const handleVerifyOtp = async (otpCode) => {
    try {
      const result = await verifyEmail(registeredEmail, otpCode);
      if (result.success) {
        setShowOtpDialog(false);
        navigate("/");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(registeredEmail);
    } catch (err) {
      console.error("Resend OTP error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left Side - Image */}
          <div className="col-lg-6 d-none d-lg-block auth-image-section">
            <div className="auth-image-overlay">
              <div className="auth-image-content">
                <Typography variant="h3" className="image-title">
                  Tham gia cùng chúng tôi
                </Typography>
                <Typography variant="h6" className="image-subtitle">
                  Trải nghiệm dịch vụ y tế hiện đại và chuyên nghiệp
                </Typography>
                <div className="image-features">
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <div className="feature-text">Đăng ký miễn phí</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <div className="feature-text">Hồ sơ sức khỏe điện tử</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <div className="feature-text">Theo dõi lịch hẹn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
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
                  Đăng ký tài khoản
                </Typography>
                <Typography variant="body2" className="auth-subtitle">
                  Tạo tài khoản mới để bắt đầu sử dụng dịch vụ của chúng tôi.
                </Typography>
              </div>

              {/* Role Selection */}
              <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                <ToggleButtonGroup
                  value={role}
                  exclusive
                  onChange={handleRoleChange}
                  aria-label="user role"
                >
                  <ToggleButton value="patient" aria-label="patient">
                    <PersonOutline sx={{ mr: 1 }} />
                    Bệnh nhân
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* Form */}
              <form onSubmit={handleSubmit} className="auth-form">
                {/* Error Alert */}
                {authError && (
                  <Alert severity="error" className="mb-3">
                    {authError}
                  </Alert>
                )}

                {/* Full Name */}
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  placeholder="Nguyễn Văn A"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  className="mb-3"
                />

                {/* Email */}
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

                {/* Phone (Optional) */}
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  placeholder="+84 123 456 789"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="action" />
                      </InputAdornment>
                    ),
                  }}
                  className="mb-3"
                />

                {/* Password */}
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

                {/* Confirm Password */}
                <TextField
                  fullWidth
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className="mb-3"
                />

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
                    `Đăng ký ${role === "patient" ? "Bệnh nhân" : "Bác sĩ"}`
                  )}
                </Button>

                {/* Divider */}
                <Divider className="my-4">
                  <Typography variant="body2" color="textSecondary">
                    Hoặc
                  </Typography>
                </Divider>

                {/* Google Register Button */}
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
                  Đăng ký với Google
                </Button>

                {/* Login Link */}
                <Box className="auth-footer-link">
                  <Typography variant="body2" color="textSecondary">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="register-link">
                      Đăng nhập ngay
                    </Link>
                  </Typography>
                </Box>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Dialog */}
      <OtpVerificationDialog
        open={showOtpDialog}
        email={registeredEmail}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        onClose={() => setShowOtpDialog(false)}
        loading={loading}
        error={authError}
      />
    </div>
  );
};

export default Register;
