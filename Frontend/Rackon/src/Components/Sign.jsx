    import React from "react";

    const Sign = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Logo / Heading */}
            <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600">Rackon</h1>
            </div>

            {/* Form */}
            <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                Full Name
                </label>
                <input
                type="text"
                placeholder="Enter your full name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                Email Address
                </label>
                <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                placeholder="********"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                Confirm Password
                </label>
                <input
                type="password"
                placeholder="********"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
            </div>

            {/* Sign Up Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
                Sign Up
            </button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-2 text-gray-500">
            <span className="h-px w-16 bg-gray-300"></span>
            <span className="text-sm">or sign up with</span>
            <span className="h-px w-16 bg-gray-300"></span>
            </div>

            {/* Social Signup */}
            <div className="flex space-x-4">
            {/* Google */}
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="google"
                className="w-5 h-5"
                />
                <span className="text-sm font-medium text-gray-700">Google</span>
            </button>

            {/* Facebook */}
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="facebook"
                className="w-5 h-5"
                />
                <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
            </div>

            {/* Login Redirect */}
            <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/Login" className="text-blue-600 hover:underline">
                Login
            </a>
            </p>
        </div>
        </div>
    );
    };

    export default Sign;
