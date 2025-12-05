import { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("https://mern-backend-ony8.onrender.com/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess("OTP sent to your email! Redirecting...");
                setTimeout(() => {
                    navigate("/reset-password", {
                        state: { email },
                    });
                }, 2000);
            } else {
                setError(data.message || "Failed to send OTP. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check if the server is running.");
            console.error("Forgot password error:", err);
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
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
                    <p className="text-gray-400">
                        Enter your email and we'll send you an OTP to reset your password
                    </p>
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
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            className="w-full bg-gray-800/50 border border-gray-700 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition-all"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending OTP..." : "Send Reset Code"}
                    </motion.button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Remember your password?{" "}
                        <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
