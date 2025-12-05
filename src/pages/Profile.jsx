import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Edit, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const navigate = useNavigate();
    const { user, token, logout, updateUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch("https://mern-backend-ony8.onrender.com/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                updateUser(data.data);
            } else {
                setError(data.message || "Failed to load profile");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Fetch profile error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">My Profile</h2>
                    <p className="text-gray-400">View and manage your account</p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-4 mb-6">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <User className="text-purple-400 h-5 w-5" />
                            <div>
                                <p className="text-gray-400 text-sm">Name</p>
                                <p className="text-white font-medium">{user?.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <Mail className="text-purple-400 h-5 w-5" />
                            <div>
                                <p className="text-gray-400 text-sm">Email</p>
                                <p className="text-white font-medium">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <Phone className="text-purple-400 h-5 w-5" />
                            <div>
                                <p className="text-gray-400 text-sm">Phone</p>
                                <p className="text-white font-medium">{user?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/edit-profile")}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all flex items-center justify-center gap-2"
                    >
                        <Edit className="h-5 w-5" />
                        Edit Profile
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="w-full bg-gray-800/50 border border-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all flex items-center justify-center gap-2"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
