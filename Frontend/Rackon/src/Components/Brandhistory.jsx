import React, { useState } from "react";

const Brandhistory = () => {
    const [history] = useState([
        {
            id: 1,
            product: "Paracetamol",
            shelf: "Medicine Shelf (Block A)",
            rent: 100,
            date: "2025-09-01",
            status: "Completed",
        },
        {
            id: 2,
            product: "Rice 5kg",
            shelf: "Grocery Shelf (Block B)",
            rent: 200,
            date: "2025-09-05",
            status: "Pending",
        },
        {
            id: 3,
            product: "Tea Pack",
            shelf: "Small Shop Shelf (Block C)",
            rent: 50,
            date: "2025-09-07",
            status: "Cancelled",
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Booking & Rental History
            </h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">Product</th>
                            <th className="px-4 py-3 text-left font-semibold">Shelf</th>
                            <th className="px-4 py-3 text-left font-semibold">Rent (₹)</th>
                            <th className="px-4 py-3 text-left font-semibold">Date</th>
                            <th className="px-4 py-3 text-left font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3">{item.product}</td>
                                <td className="px-4 py-3">{item.shelf}</td>
                                <td className="px-4 py-3">₹{item.rent}</td>
                                <td className="px-4 py-3">{item.date}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium
                      ${item.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : item.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Brandhistory;