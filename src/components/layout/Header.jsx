// src/components/layout/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LocalHospital,
  Menu as MenuIcon,
  Person,
  ExitToApp,
  Dashboard,
  Phone,
} from "@mui/icons-material";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Doctors", path: "/doctors" },
    { label: "Blog", path: "/blogs" },
    { label: "Contact", path: "/contact" },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <LocalHospital color="primary" />
        <span style={{ fontWeight: 700 }}>DOCCURE</span>
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} component={Link} to={item.path}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {!user ? (
          <>
            <ListItem component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem component={Link} to="/register">
              <ListItemText primary="Sign up" />
            </ListItem>
          </>
        ) : (
          <ListItem onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" className="header" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters className="toolbar">
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              className="logo"
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocalHospital className="logo-icon" />
              <Typography variant="h6" className="logo-text">
                DOCCURE
              </Typography>
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box className="nav-menu">
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    className="nav-link"
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Right Side Actions */}
            <Box className="header-actions">
              {/* Contact */}
              <Box
                className="contact-info"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Phone className="contact-icon" />
                <Box>
                  <Typography variant="caption" className="contact-label">
                    Contact
                  </Typography>
                  <Typography variant="body2" className="contact-number">
                    +1 315 369 5943
                  </Typography>
                </Box>
              </Box>

              {/* Auth Buttons */}
              {!user ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    className="login-btn"
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    className="signup-btn"
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  <IconButton
                    onClick={handleMenuOpen}
                    className="avatar-btn"
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    <Avatar className="user-avatar">
                      {user.fullName?.charAt(0) || "U"}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={handleMenuClose}
                      component={Link}
                      to="/profile"
                    >
                      <Person sx={{ mr: 1 }} /> Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      component={Link}
                      to="/dashboard"
                    >
                      <Dashboard sx={{ mr: 1 }} /> Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ExitToApp sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className="mobile-menu-btn"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
