import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/api/auth/login/", {
                username,
                password,
            });

            const { access, refresh, user } = response.data;

            if (rememberMe) {
                localStorage.setItem("access_token", access);
                localStorage.setItem("refresh_token", refresh);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                sessionStorage.setItem("access_token", access);
                sessionStorage.setItem("refresh_token", refresh);
                sessionStorage.setItem("user", JSON.stringify(user));
            }

            if (user.role === "owner") navigate("/owner/dashboard");
            else if (user.role === "brand") navigate("/brand/dashboard");
            else navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Check credentials.");
        } finally {
            setLoading(false);
        }
    };
    const handleForgotPassword = async () => {
        const email = prompt("Enter your registered email for password reset");

        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            await axios.post("http://localhost:8000/api/auth/forgot-password/", { email });

            alert("OTP has been generated. Check console for OTP (for testing)");

            navigate("/otp", { state: { email } });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600">Rackon</h1>
                    <p className="mt-2 text-gray-600">Login to access your account</p>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="your username"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="h-4 w-4 text-blue-600"
                            />
                            <span className="text-gray-600">Remember me</span>
                        </label>

                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <a href="/Sign" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;