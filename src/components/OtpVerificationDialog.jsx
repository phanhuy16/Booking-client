import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { VerifiedUser, Refresh } from "@mui/icons-material";

const OtpVerificationDialog = ({
  open,
  email,
  onVerify,
  onResend,
  onClose,
  loading,
  error,
}) => {
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (open && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [open, countdown]);

  const handleVerify = () => {
    if (otpCode.length === 6) {
      onVerify(otpCode);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setCountdown(60);
    setOtpCode("");
    await onResend();
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(value);
  };

  const handleClose = () => {
    setOtpCode("");
    setCountdown(60);
    setCanResend(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <VerifiedUser color="primary" />
          <Typography variant="h6">Xác thực Email</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến email:
          <br />
          <strong>{email}</strong>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Mã OTP"
          value={otpCode}
          onChange={handleOtpChange}
          placeholder="123456"
          inputProps={{
            maxLength: 6,
            style: {
              textAlign: "center",
              fontSize: "24px",
              letterSpacing: "8px",
            },
          }}
          sx={{ mb: 2 }}
          autoFocus
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Không nhận được mã?
          </Typography>
          <Button
            size="small"
            disabled={!canResend || loading}
            onClick={handleResend}
            startIcon={<Refresh />}
          >
            {canResend ? "Gửi lại" : `Gửi lại (${countdown}s)`}
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={handleVerify}
          variant="contained"
          disabled={otpCode.length !== 6 || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Xác nhận"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OtpVerificationDialog;
