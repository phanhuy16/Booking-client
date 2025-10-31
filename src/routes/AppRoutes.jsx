// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { BlogDetail, BlogList, Booking, BookingList, DoctorDetail, DoctorList, Home, Login, NotFound, Register, Specialties, SpecialtyDetail } from "../pages";
import { Layout } from "../components/layout";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Blog Routes */}
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />

        {/* Doctor Routes */}
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/:id/details" element={<DoctorDetail />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/specialties/:id" element={<SpecialtyDetail />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/booking/:doctorId"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <BookingList />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <div>Profile Page (Coming Soon)</div>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div>Dashboard Page (Coming Soon)</div>
            </PrivateRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
