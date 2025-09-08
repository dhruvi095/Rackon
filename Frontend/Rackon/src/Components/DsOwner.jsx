import { useState } from "react";

function DsOwner() {
  const [shelves, setShelves] = useState([
    { id: 1, name: "Shelf A", size: "Large", location: "Block 1", rent: 500, img: "https://via.placeholder.com/150", visibility: "public" },
    { id: 2, name: "Shelf B", size: "Medium", location: "Block 2", rent: 700, img: "https://via.placeholder.com/150", visibility: "private" },
  ]);

  const [editingShelf, setEditingShelf] = useState(null);
  const [addingShelf, setAddingShelf] = useState(false);

  // Save edited shelf
  const handleSaveEdit = () => {
    setShelves(
      shelves.map((s) => (s.id === editingShelf.id ? editingShelf : s))
    );
    setEditingShelf(null);
  };

  // Delete shelf
  const handleDelete = (id) => {
    setShelves(shelves.filter((shelf) => shelf.id !== id));
  };

  // Save new shelf
  const handleSaveNew = (newShelf) => {
    setShelves([...shelves, { ...newShelf, id: shelves.length + 1 }]);
    setAddingShelf(false);
  };
  const showHistory = () => {
    alert("Here you can show the user's history or navigate to history page.");
  };

  const showPayments = () => {
    alert("Here you can show user's payments or navigate to payments page.");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      alert("Logged out successfully!");
      // Add your logout logic here (e.g., clearing tokens, redirecting)
    }
  };
    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        {/* <aside className="w-64 bg-white shadow-lg p-6"> */}
        {/* <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full border"
          />
          <h2 className="mt-3 text-lg font-semibold">Dhruvi123</h2>
          <p className="text-sm text-gray-500">dhruvi@example.com</p>
        </div>

        <div className="mt-8 space-y-3">
          <button className="w-full py-2 px-3 bg-indigo-600 text-white rounded-lg">
            Dashboard
          </button>
          <button className="w-full py-2 px-3 bg-gray-200 rounded-lg">
            History
          </button>
          <button className="w-full py-2 px-3 bg-gray-200 rounded-lg">
            Payments
          </button>
          <button className="w-full py-2 px-3 bg-red-600 text-white rounded-lg">
            Log Out
          </button>
        </div>
      </aside> */}
        <aside className="w-64 bg-white shadow-lg p-6">
          {/* Profile Info */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <h2 className="mt-3 text-lg font-semibold">Dhruvi123</h2>
            <p className="text-sm text-gray-500">dhruvi@example.com</p>
          </div>

          {/* Sidebar Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => showHistory()}
              className="w-full py-2 px-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              History
            </button>

            <button
              onClick={() => showPayments()}
              className="w-full py-2 px-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Payments
            </button>

            <button
              onClick={() => handleLogout()}
              className="w-full py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Manage Shelves</h1>

          {/* Shelves Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shelves.map((shelf) => (
              <div
                key={shelf.id}
                className="bg-white p-4 rounded-lg shadow flex flex-col"
              >
                <img
                  src={shelf.img}
                  alt={shelf.name}
                  className="h-32 w-full object-cover rounded-md"
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
                    className="flex-1 bg-yellow-500 text-white py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(shelf.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Add Shelf Card */}
            <div
              onClick={() => setAddingShelf(true)}
              className="bg-gray-200 p-4 rounded-lg shadow flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
            >
              <span className="text-4xl">➕</span>
              <p className="mt-2 font-semibold">Add New Shelf</p>
            </div>
          </div>

          {/* Edit Shelf Form */}
          {editingShelf && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3">
              <h2 className="font-bold text-lg">Edit Shelf</h2>

              <div>
                <label className="block text-sm font-medium mb-1">Shelf Name</label>
                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded"
                  value={editingShelf.name}
                  onChange={(e) =>
                    setEditingShelf({ ...editingShelf, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Shelf Size</label>
                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded"
                  value={editingShelf.size}
                  onChange={(e) =>
                    setEditingShelf({ ...editingShelf, size: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded"
                  value={editingShelf.location}
                  onChange={(e) =>
                    setEditingShelf({ ...editingShelf, location: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rent (₹)</label>
                <input
                  type="number"
                  className="border px-3 py-2 w-full rounded"
                  value={editingShelf.rent}
                  onChange={(e) =>
                    setEditingShelf({ ...editingShelf, rent: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Shelf Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border px-3 py-2 w-full rounded"
                  onChange={(e) =>
                    setEditingShelf({
                      ...editingShelf,
                      img: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
                {editingShelf.img && (
                  <img
                    src={editingShelf.img}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-md border"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Visibility</label>
                <select
                  className="border px-3 py-2 w-full rounded"
                  value={editingShelf.visibility}
                  onChange={(e) =>
                    setEditingShelf({
                      ...editingShelf,
                      visibility: e.target.value,
                    })
                  }
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingShelf(null)}
                  className="flex-1 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Add Shelf Form */}
          {addingShelf && (
            <AddShelfForm onSave={handleSaveNew} onCancel={() => setAddingShelf(false)} />
          )}
        </main>
      </div>
    );
  }

  /* Separate AddShelf Form Component */
  function AddShelfForm({ onSave, onCancel }) {
    const [newShelf, setNewShelf] = useState({
      name: "",
      size: "",
      location: "",
      rent: "",
      img: "",
      visibility: "public",
    });

    return (
      <>
        <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3">
          <h2 className="font-bold text-lg">Add New Shelf</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Shelf Name</label>
            <input
              type="text"
              className="border px-3 py-2 w-full rounded"
              value={newShelf.name}
              onChange={(e) => setNewShelf({ ...newShelf, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shelf Size</label>
            <input
              type="text"
              className="border px-3 py-2 w-full rounded"
              value={newShelf.size}
              onChange={(e) => setNewShelf({ ...newShelf, size: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="border px-3 py-2 w-full rounded"
              value={newShelf.location}
              onChange={(e) =>
                setNewShelf({ ...newShelf, location: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rent (₹)</label>
            <input
              type="number"
              className="border px-3 py-2 w-full rounded"
              value={newShelf.rent}
              onChange={(e) => setNewShelf({ ...newShelf, rent: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shelf Photo</label>
            <input
              type="file"
              accept="image/*"
              className="border px-3 py-2 w-full rounded"
              onChange={(e) =>
                setNewShelf({
                  ...newShelf,
                  img: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            {newShelf.img && (
              <img
                src={newShelf.img}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Visibility</label>
            <select
              className="border px-3 py-2 w-full rounded"
              value={newShelf.visibility}
              onChange={(e) =>
                setNewShelf({ ...newShelf, visibility: e.target.value })
              }
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onSave(newShelf)}
              className="flex-1 py-2 bg-green-600 text-white rounded-lg"
            >
              Add
            </button>
            <button
              onClick={onCancel}
              className="flex-1 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>

      </>
    );
  }

export default DsOwner;
