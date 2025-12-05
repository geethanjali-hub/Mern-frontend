import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
