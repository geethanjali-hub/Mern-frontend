import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const inputRefs = useRef([]);

    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split("");
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    };

    const validatePassword = () => {
        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return false;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter all 6 digits of OTP");
            return;
        }

        if (!validatePassword()) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp: otpString,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess("Password reset successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setError(data.message || "Failed to reset password. Please try again.");
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            setError("Network error. Please check if the server is running.");
            console.error("Reset password error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
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
                setSuccess("New OTP sent to your email!");
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            } else {
                setError(data.message || "Failed to resend OTP");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Resend OTP error:", err);
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
                    <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                    <p className="text-gray-400">
                        Enter the OTP sent to
                        <br />
                        <span className="text-purple-400">{email}</span>
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
                    {/* OTP Input */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Enter OTP
                        </label>
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-14 text-center text-2xl font-bold bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    disabled={loading}
                                />
                            ))}
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            New Password
                        </label>
                        <Lock className="absolute left-3 top-[42px] transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            required
                            minLength={6}
                            className="w-full bg-gray-800/50 border border-gray-700 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition-all"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setPasswordError("");
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-[42px] transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Confirm Password
                        </label>
                        <Lock className="absolute left-3 top-[42px] transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            required
                            minLength={6}
                            className="w-full bg-gray-800/50 border border-gray-700 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition-all"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setPasswordError("");
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-[42px] transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Password Error */}
                    {passwordError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-200 text-sm"
                        >
                            {passwordError}
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Resetting Password..." : "Reset Password"}
                    </motion.button>
                </form>

                {/* Resend OTP */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Didn't receive the code?{" "}
                        <button
                            onClick={handleResendOTP}
                            disabled={loading}
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors disabled:opacity-50"
                        >
                            Resend OTP
                        </button>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
