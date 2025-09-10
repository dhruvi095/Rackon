import React from "react";

const Payment = () => {

    const paymentData = [
        {
            id: "TXN12345",
            date: "2025-09-01",
            amount: "₹500",
            method: "Credit Card",
            status: "Success",
        },
        {
            id: "TXN67890",
            date: "2025-08-21",
            amount: "₹700",
            method: "UPI",
            status: "Pending",
        },
        {
            id: "TXN54321",
            date: "2025-07-15",
            amount: "₹1200",
            method: "Net Banking",
            status: "Failed",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-15">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                    Payment History
                </h1>
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Payment ID
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Amount
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Method
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paymentData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">{item.id}</td>
                                    <td className="px-4 py-3">{item.date}</td>
                                    <td className="px-4 py-3">{item.amount}</td>
                                    <td className="px-4 py-3">{item.method}</td>
                                    <td
                                        className={`px-4 py-3 font-medium ${item.status === "Success"
                                            ? "text-green-600"
                                            : item.status === "Pending"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {paymentData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md transition"
                        >
                            <p className="text-sm font-semibold text-gray-800">
                                Payment ID: {item.id}
                            </p>
                            <p className="text-xs text-gray-500">📅 {item.date}</p>
                            <p className="text-sm text-gray-700">💰 {item.amount}</p>
                            <p className="text-sm text-gray-700">💳 {item.method}</p>
                            <p
                                className={`mt-1 text-sm font-medium ${item.status === "Success"
                                    ? "text-green-600"
                                    : item.status === "Pending"
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {item.status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Payment;