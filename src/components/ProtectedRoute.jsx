import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
