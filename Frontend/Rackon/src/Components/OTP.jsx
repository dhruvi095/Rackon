import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const OTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ""; 
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError("");
        const otpCode = otp.join("");

        if (otpCode.length < 4) {
            setError("Enter complete OTP");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:8000/api/auth/verify-otp/", {
                email,
                otp: otpCode,
            });

            alert("OTP verified successfully");
            navigate("/reset", { state: { email, otp: otpCode } });
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600">Rackon</h1>
                    <p className="mt-2 text-gray-600">Enter the OTP sent to your email</p>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <form className="space-y-5" onSubmit={handleVerify}>
                    <div className="flex justify-between space-x-3">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Didn’t receive OTP?{" "}
                    <a href="/reset" className="text-blue-600 hover:underline">
                        Resend
                    </a>
                </p>
            </div>
        </div>
    );
};

export default OTP;