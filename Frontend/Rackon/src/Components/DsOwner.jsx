import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";

function DsOwner() {
  const navigate = useNavigate();

  const [shelves, setShelves] = useState([
    {
      id: 1,
      name: "Shelf A",
      size: "Small",
      location: "Block 1",
      rent: 500,
      img: s1,
      visibility: "public",
    },
    {
      id: 2,
      name: "Shelf B",
      size: "Large",
      location: "Block 2",
      rent: 700,
      img: s2,
      visibility: "private",
    },
    {
      id: 3,
      name: "Shelf C",
      size: "Medium",
      location: "Block 3",
      rent: 600,
      img: s3,
      visibility: "private",
    },
  ]);

  const [editingShelf, setEditingShelf] = useState(null);

  const handleDelete = (id) => {
    setShelves(shelves.filter((shelf) => shelf.id !== id));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <aside className="w-full lg:w-64 bg-white shadow-lg p-6 flex-shrink-0">
        <div className="flex flex-col items-center mt-4">
          <div className="w-32 h-32 rounded-full mt-15 border-4 border-gray-200 shadow-md overflow-hidden bg-white flex items-center justify-center">
            <img
              src={user}
              alt="Profile"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Dhruvi123
          </h2>
          <p className="text-sm text-gray-500">dhruvi@example.com</p>
        </div>
        <div className="mt-10 space-y-4 w-full">
          <button
            onClick={() => navigate("/History")}
            className="w-full py-2 px-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            History
          </button>

          <button
            onClick={() => navigate("/Payment")}
            className="w-full py-2 px-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Payments
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Manage Shelves
        </h1>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelves.map((shelf) => (
            <div
              key={shelf.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col hover:shadow-lg transition"
            >
              <img
                src={shelf.img}
                alt={shelf.name}
                className="h-40 w-full object-contain rounded-md bg-gray-50"
              />
              <h2 className="mt-3 font-semibold text-lg">{shelf.name}</h2>
              <p className="text-sm text-gray-600">
                Size: {shelf.size} | Location: {shelf.location}
              </p>
              <p className="text-sm text-gray-600">Rent: ₹{shelf.rent}</p>
              <p className="text-sm text-gray-600">
                Visibility: {shelf.visibility}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setEditingShelf(shelf)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded text-sm md:text-base hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(shelf.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded text-sm md:text-base hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default DsOwner;