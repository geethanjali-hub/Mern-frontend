import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, Image, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, token, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        profileImage: "",
        currentPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                profileImage: user.profileImage || "",
                currentPassword: "",
                newPassword: "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // Prepare update data (only include fields that changed)
        const updateData = {};
        if (formData.name !== user.name) updateData.name = formData.name;
        if (formData.phone !== user.phone) updateData.phone = formData.phone;
        if (formData.profileImage !== user.profileImage) updateData.profileImage = formData.profileImage;

        // Include password fields if user wants to change password
        if (formData.newPassword) {
            if (!formData.currentPassword) {
                setError("Please provide current password to change password");
                setLoading(false);
                return;
            }
            updateData.currentPassword = formData.currentPassword;
            updateData.newPassword = formData.newPassword;
        }

        try {
            const response = await fetch("https://mern-backend-ony8.onrender.com/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess("Profile updated successfully!");
                updateUser(data.data);
                setTimeout(() => {
                    navigate("/profile");
                }, 1500);
            } else {
                setError(data.message || "Failed to update profile");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Update profile error:", err);
        } finally {
            setLoading(false);
        }
    };

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
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/profile")}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
                        <p className="text-gray-400">Update your account information</p>
                    </div>
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

                {/* Success Message */}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm"
                    >
                        {success}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            className="w-full bg-gray-800/50 border border-gray-700 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition-all"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            className="w-full bg-gray-800/50 border border-gray-700 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition-all"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            name="profileImage"
                            placeholder="Profile Image URL (optional)"
                            className="w-full bg-gray-800/50 border border-gray-700 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition-all"
                            value={formData.profileImage}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                        <p className="text-gray-400 text-sm mb-4">Change Password (optional)</p>

                        <div className="space-y-4">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    className="w-full bg-gray-800/50 border border-gray-700 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition-all"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New Password"
                                    minLength={6}
                                    className="w-full bg-gray-800/50 border border-gray-700 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition-all"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default EditProfile;
