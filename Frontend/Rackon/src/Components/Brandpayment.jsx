import React, { useState } from "react";

const Brandpayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment successful via ${paymentMethod.toUpperCase()}!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 md:p-10">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Brand Payment
        </h1>

        {/* Order Summary */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Order Summary</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Product Shelf Rent</span>
            <span>₹500</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>GST (18%)</span>
            <span>₹90</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800 text-lg">
            <span>Total</span>
            <span>₹590</span>
          </div>
        </div>

        {/* Payment Method */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Select Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Credit/Debit Card */}
              <label
                className={`cursor-pointer border rounded-lg p-4 text-center ${
                  paymentMethod === "credit"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === "credit"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                💳 Card
              </label>

              {/* UPI */}
              <label
                className={`cursor-pointer border rounded-lg p-4 text-center ${
                  paymentMethod === "upi"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                📱 UPI
              </label>

              {/* Net Banking */}
              <label
                className={`cursor-pointer border rounded-lg p-4 text-center ${
                  paymentMethod === "netbanking"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="netbanking"
                  checked={paymentMethod === "netbanking"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                🏦 Net Banking
              </label>
            </div>
          </div>

          {/* Payment Details */}
          {paymentMethod === "credit" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Card Number"
                maxLength={16}
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="CVV"
                  maxLength={3}
                  className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div>
              <input
                type="text"
                placeholder="Enter UPI ID (e.g., name@upi)"
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div>
              <select
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                required
              >
                <option value="">Select Bank</option>
                <option value="SBI">SBI</option>
                <option value="HDFC">HDFC</option>
                <option value="ICICI">ICICI</option>
                <option value="Axis">Axis</option>
              </select>
            </div>
          )}

          {/* Pay Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
          >
            Pay Now ₹590
          </button>
        </form>
      </div>
    </div>
  );
};

export default Brandpayment;
