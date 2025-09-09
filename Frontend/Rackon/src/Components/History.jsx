import React from "react";

const History = () => {

    const historyData = [
        {
            id: 1,
            action: "Rented Shelf A",
            date: "2025-09-01",
            amount: "₹500",
            status: "Completed",
        },
        {
            id: 2,
            action: "Rented Shelf B",
            date: "2025-08-21",
            amount: "₹700",
            status: "Pending",
        },
        {
            id: 3,
            action: "Renewed Shelf A",
            date: "2025-07-15",
            amount: "₹500",
            status: "Completed",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-15">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                    Rental History
                </h1>
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Action
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Amount
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {historyData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">{item.action}</td>
                                    <td className="px-4 py-3">{item.date}</td>
                                    <td className="px-4 py-3">{item.amount}</td>
                                    <td
                                        className={`px-4 py-3 font-medium ${item.status === "Completed"
                                            ? "text-green-600"
                                            : "text-yellow-600"
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
                    {historyData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md transition"
                        >
                            <p className="text-sm font-semibold text-gray-800">
                                {item.action}
                            </p>
                            <p className="text-xs text-gray-500">📅 {item.date}</p>
                            <p className="text-sm text-gray-700">💰 {item.amount}</p>
                            <p
                                className={`mt-1 text-sm font-medium ${item.status === "Completed"
                                    ? "text-green-600"
                                    : "text-yellow-600"
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

export default History;