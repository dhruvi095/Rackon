import React from "react";

const OTP = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Rackon</h1>
          <p className="mt-2 text-gray-600">Enter the OTP sent to your email</p>
        </div>

        {/* OTP Form */}
        <form className="space-y-5">
          <div className="flex justify-between space-x-3">
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </form>

        {/* Back to Reset */}
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
