import React, { useState, useEffect } from "react";
import api from "../utils/api";

function DsOwner() {
  const [shelves, setShelves] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, shelves, bookings, earnings, profile
  // const [imageFile, setImageFile] = useState(null);
  const [editingShelf, setEditingShelf] = useState(null);
  const [addingShelf, setAddingShelf] = useState(false);
  const [inventoryShelf, setInventoryShelf] = useState(null); // Shelf whose inventory is open
  const [inventoryData, setInventoryData] = useState([]); // List of products stored in that shelf
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const closeInventory = () => {
    setInventoryShelf(null);
    setInventoryData([]);
  };

  useEffect(() => {
    fetchShelves();
    fetchBookings();
    fetchProfile();

    const ws = new WebSocket('ws://localhost:8000/ws/bookings/');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Booking update via WebSocket:", data);

      // Ignore connection/system messages
      if (!data.id) {
        return;
      }

      setBookings((prev) => {
        const index = prev.findIndex((b) => b.id === data.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], ...data };
          return updated;
        } else {
          return [...prev, data];
        }
      });
    };

    ws.onclose = () => console.log('WebSocket disconnected');

    return () => ws.close();
  }, []);

  // --- UPDATE BOOKING STATUS ---
  const handleBookingUpdate = async (bookingId, newStatus) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/status/`, { status: newStatus });
      const updatedBooking = res.data; // ✅ full booking object

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? updatedBooking : b))
      );
      // fetchBookings();

      alert(`Booking ${newStatus}`);
    } catch (err) {
      console.error("Error updating booking status:", err.response?.data || err);
    }
  };



  const fetchShelves = async () => {
    try {
      const res = await api.get("/shelves/");
      setShelves(res.data);
    } catch (err) {
      console.error("Error fetching shelves:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };



  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile/");
      const profileData = res.data;

      if (profileData.image && profileData.image.startsWith('/media')) {
        profileData.image = `http://localhost:8000${profileData.image}`;
      }

      // console.log("Profile Fetched:", profileData);
      setProfile(profileData);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleSaveEdit = async (updatedShelf) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedShelf.name);
      formData.append("size", updatedShelf.size);
      formData.append("location", updatedShelf.location);
      formData.append("rent", updatedShelf.rent);
      formData.append("event_type", updatedShelf.event_type);
      formData.append("visibility", updatedShelf.visibility);
      formData.append("is_active", updatedShelf.is_active);
      formData.append("currently_available", updatedShelf.currently_available);

      if (updatedShelf.imgFile) {
        formData.append("image", updatedShelf.imgFile);
      }

      const res = await api.put(`/shelves/${updatedShelf.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the local shelves array immediately
      setShelves((prevShelves) =>
        prevShelves.map((shelf) => (shelf.id === updatedShelf.id ? res.data : shelf))
      );

      setEditingShelf(null);
    } catch (err) {
      console.error("Error updating shelf:", err);
    }
  };


  const handleDelete = async (id) => {
    try {
      await api.delete(`/shelves/${id}/`);
      fetchShelves();
    } catch (err) {
      console.error("Error deleting shelf:", err);
    }
  };

  const handleSaveNew = async (newShelf) => {
    try {
      const formData = new FormData();
      formData.append("name", newShelf.name);
      formData.append("size", newShelf.size);
      formData.append("location", newShelf.location);
      formData.append("rent", newShelf.rent);
      formData.append("event_type", newShelf.event_type);
      formData.append("visibility", newShelf.visibility);
      formData.append("is_active", newShelf.is_active);
      formData.append("currently_available", newShelf.currently_available);

      if (newShelf.imgFile) formData.append("image", newShelf.imgFile);

      await api.post("/shelves/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchShelves();
      setAddingShelf(false);
    } catch (err) {
      console.error("Error adding shelf:", err);
    }
  };


  const handleProfileSave = async () => {
    try {
      // 1. Update text fields (name, email, phone)
      await api.put("/auth/profile/update/", {
        username: profile.name,   // backend stores name as username
        email: profile.email,
        phone_number: profile.phone,
      });

      // 2. Update image if provided
      if (profile.imageFile) {
        const formData = new FormData();
        formData.append("profile_image", profile.imageFile); // backend expects profile_image
        await api.patch("/auth/profile/upload_image/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Profile saved successfully!");
      fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err);
    }
  };

  useEffect(() => {
    if (!inventoryShelf) return; // do nothing if no shelf is open

    const ws = new WebSocket(`ws://localhost:8000/ws/shelves/${inventoryShelf.id}/`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Real-time inventory update:", data);

      setInventoryData((prev) => {
        const index = prev.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], ...data };
          return updated;
        } else {
          return [...prev, data];
        }
      });
    };

    ws.onclose = () => console.log("Inventory WebSocket closed");

    return () => ws.close(); // cleanup when inventoryShelf changes or modal closes
  }, [inventoryShelf]);


  const openInventory = async (shelf) => {
    setInventoryShelf(shelf); // triggers the useEffect below
    try {
      const res = await api.get(`/shelves/${shelf.id}/inventory/`);
      // console.log("Fetched inventory:", res.data);
      setInventoryData(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };




  const totalEarnings = bookings.reduce((sum, b) => {
    if (b.status === "accepted" && b.payment_status === "completed") {
      return sum + (b.amount || 0);
    }
    return sum;
  }, 0);


  const upcomingBookings = bookings.filter(
    b => new Date(b.start_date) >= new Date()
  );
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between pt-20">
        <div>
          <div className="flex flex-col items-center mb-6">
            <img
              src={profile.image || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border mb-2"
            />
            <h2 className="font-semibold text-lg">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <button onClick={() => setActiveTab("dashboard")} className={`py-2 px-3 rounded ${activeTab === "dashboard" ? "bg-green-500 text-white" : "bg-gray-200"}`}>Dashboard</button>
            <button onClick={() => setActiveTab("shelves")} className={`py-2 px-3 rounded ${activeTab === "shelves" ? "bg-green-500 text-white" : "bg-gray-200"}`}>Shelves</button>
            <button onClick={() => setActiveTab("bookings")} className={`py-2 px-3 rounded ${activeTab === "bookings" ? "bg-green-500 text-white" : "bg-gray-200"}`}>Bookings</button>
            <button onClick={() => setActiveTab("earnings")} className={`py-2 px-3 rounded ${activeTab === "earnings" ? "bg-green-500 text-white" : "bg-gray-200"}`}>Earnings</button>
            <button onClick={() => setActiveTab("profile")} className={`py-2 px-3 rounded ${activeTab === "profile" ? "bg-green-500 text-white" : "bg-gray-200"}`}>Profile</button>
          </nav>
        </div>

        
      </aside>
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-700">Total Shelves</h3>
                <p className="text-2xl font-bold">{shelves.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-700">Upcoming Bookings</h3>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-700">Total Earnings</h3>
                <p className="text-2xl font-bold">₹{totalEarnings}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shelves" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Shelves</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shelves.map((shelf) => (
                <div key={shelf.id} className="bg-white p-4 rounded-lg shadow flex flex-col relative">
                  <img
                    src={shelf.image ? shelf.image : "/default_shelf.png"}
                    alt={shelf.name}
                    className="h-32 w-full object-cover rounded-md"
                  />
                  <h2 className="mt-3 font-semibold text-lg">{shelf.name}</h2>
                  <p className="text-sm text-gray-600"><strong>Size:</strong> {shelf.size}</p>
                  <p className="text-sm text-gray-600"><strong>Location:</strong> {shelf.location}</p>
                  <p className="text-sm text-gray-600"><strong>Rent:</strong> ₹{shelf.rent}</p>
                  <p className="text-sm text-gray-600"><strong>Visibility:</strong> {shelf.visibility}</p>

                  {/* Status Labels */}
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 rounded text-white text-xs ${shelf.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                      {shelf.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className={`px-2 py-1 rounded text-white text-xs ${shelf.currently_available ? 'bg-blue-500' : 'bg-gray-500'}`}>
                      {shelf.currently_available ? 'Available' : 'Not Available'}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setEditingShelf(shelf)} className="flex-1 bg-yellow-500 text-white py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(shelf.id)} className="flex-1 bg-red-500 text-white py-1 rounded">Delete</button>
                    <button onClick={() => openInventory(shelf)} className="flex-1 bg-indigo-500 text-white py-1 rounded">Inventory</button>

                  </div>
                </div>
              ))}

              <div onClick={() => setAddingShelf(true)} className="bg-gray-200 p-4 rounded-lg shadow flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300">
                <span className="text-4xl">➕</span>
                <p className="mt-2 font-semibold">Add New Shelf</p>
              </div>
            </div>

            {editingShelf && (
              <EditShelfForm shelf={editingShelf} onSave={handleSaveEdit} onCancel={() => setEditingShelf(null)} setShelf={setEditingShelf} />
            )}

            {addingShelf && (
              <AddShelfForm onSave={handleSaveNew} onCancel={() => setAddingShelf(false)} />
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Bookings</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="py-2 px-4">Shelf</th>
                    <th className="py-2 px-4">Renter</th>
                    <th className="py-2 px-4">Start Date</th>
                    <th className="py-2 px-4">End Date</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b">
                      <td className="py-2 px-4">{b.shelf?.name || "N/A"}</td>
                      <td className="py-2 px-4">{b.renter?.username || "N/A"}</td>
                      <td className="py-2 px-4">{new Date(b.start_date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{new Date(b.end_date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">₹{b.amount || 0}</td>
                      <td className="py-2 px-4">{b.status}</td>
                      <td className="py-2 px-4 flex gap-2 items-center">
                        {b.status === "pending" ? (
                          <>
                            <button
                              onClick={() => handleBookingUpdate(b.id, "accepted")}
                              className="bg-green-500 text-white px-2 py-1 rounded"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleBookingUpdate(b.id, "rejected")}
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className={`px-2 py-1 rounded text-white ${b.status === "accepted" ? "bg-green-500" : b.status === "rejected" ? "bg-red-500" : "bg-gray-500"}`}>
                            {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {activeTab === "earnings" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Earnings</h1>
            <p className="text-gray-700 mb-4">Total Earnings: <span className="font-semibold">₹{totalEarnings}</span></p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="py-2 px-4">Booking ID</th>
                    <th className="py-2 px-4">Shelf</th>
                    <th className="py-2 px-4">Renter</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b">
                      <td className="py-2 px-4">{b.id}</td>
                      <td>{b.shelf?.name}</td>
                      <td>{b.renter?.username}</td>
                      <td className="py-2 px-4">₹{b.amount}</td>
                      <td className="py-2 px-4">{b.status}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-2 py-1 rounded text-white text-xs ${b.payment_status === "paid"
                            ? "bg-green-500"
                            : b.payment_status === "pending"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                            }`}
                        >
                          {b.payment_status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="bg-white p-6 rounded-lg shadow max-w-md">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={profile.image || "/default_avatar.png"}  // Make sure /default_avatar.png exists in public folder
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border mb-2"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      imageFile: e.target.files[0], // file to send
                      imagePreview: URL.createObjectURL(e.target.files[0]) // preview only
                    })
                  }
                />

              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="border px-3 py-2 w-full rounded"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
                <button
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg mt-2"
                  onClick={handleProfileSave}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        )}
        {inventoryShelf && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full">
              <h2 className="text-xl font-semibold mb-4">Inventory for {inventoryShelf.name}</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="py-2 px-4">Product</th>
                      <th className="py-2 px-4">Stored Quantity</th>
                      <th className="py-2 px-4">Sold Quantity</th>
                      <th className="py-2 px-4">Total Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 px-4">{item.product_name || "N/A"}</td>
                        <td className="py-2 px-4">{item.quantity_stored}</td>
                        <td className="py-2 px-4">{item.quantity_sold}</td>
                        <td className="py-2 px-4">₹{item.total_payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={closeInventory}
                className="mt-4 bg-gray-400 text-white py-2 px-4 rounded mt-10"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </main>
    </div>

  );
}

function EditShelfForm({ shelf, onSave, onCancel, setShelf }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow max-w-md w-full h-full overflow-y-auto pt-20 pb-10 mt-5">
        <h2 className="text-xl font-semibold mb-4">Edit Shelf</h2>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded mb-3"
          value={shelf.name}
          onChange={(e) => setShelf({ ...shelf, name: e.target.value })}
        />
        <label className="block mb-2">Size</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded mb-3"
          value={shelf.size}
          onChange={(e) => setShelf({ ...shelf, size: e.target.value })}
        />
        <label className="block mb-2">Location</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded mb-3"
          value={shelf.location}
          onChange={(e) => setShelf({ ...shelf, location: e.target.value })}
        />
        <label className="block mb-2">Rent</label>
        <input
          type="number"
          className="border px-3 py-2 w-full rounded mb-3"
          value={shelf.rent}
          onChange={(e) => setShelf({ ...shelf, rent: parseInt(e.target.value) })}
        />
        <label className="block mb-2">Event Type</label>
        <select
          className="border px-3 py-2 w-full rounded mb-3"
          value={shelf.event_type}
          onChange={(e) => setShelf({ ...shelf, event_type: e.target.value })}
        >
          <option value="Retail / Pop-up store">Retail / Pop-up store</option>
          <option value="Art Exhibit / Gallery">Art Exhibit / Gallery</option>
          <option value="Corporate Event">Corporate Event</option>
          <option value="Workshop / Seminar">Workshop / Seminar</option>
          <option value="Food / Beverage Tasting">Food / Beverage Tasting</option>
          <option value="Book / Art Launch">Book / Art Launch</option>
          <option value="Other">Other</option>
        </select>

        <label className="block mb-2">Image</label>
        <input
          type="file"
          accept="image/*"
          className="border px-3 py-2 w-full rounded mb-3"
          onChange={(e) => setShelf({ ...shelf, imgFile: e.target.files[0], imgPreview: URL.createObjectURL(e.target.files[0]) })}
        />
        {shelf.imgPreview && (
          <img src={shelf.imgPreview} alt="Preview" className="h-32 w-full object-cover rounded mb-3" />
        )}

        <label className="block mb-2">Visibility</label>
        <select
          className="border px-3 py-2 w-full rounded mb-3"
          value={shelf.visibility}
          onChange={(e) => setShelf({ ...shelf, visibility: e.target.value })}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={shelf.is_active}
            onChange={(e) => setShelf({ ...shelf, is_active: e.target.checked })}
            className="mr-2"
          />
          Active
        </label>

        <label className="block mb-2">
          <input
            type="checkbox"
            checked={shelf.currently_available}
            onChange={(e) => setShelf({ ...shelf, currently_available: e.target.checked })}
            className="mr-2"
          />
          Currently Available
        </label>

        <div className="flex gap-2">
          <button onClick={() => onSave(shelf)} className="flex-1 bg-green-500 text-white py-2 rounded">Save</button>
          <button onClick={onCancel} className="flex-1 bg-gray-400 text-white py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function AddShelfForm({ onSave, onCancel }) {
  const [newShelf, setNewShelf] = useState({
    name: "",
    size: "",
    location: "",
    rent: 0,
    event_type: "Retail / Pop-up store",
    img: "",
    visibility: "public",
    is_active: true,
    currently_available: true,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow max-w-md w-full h-full overflow-y-auto pt-20 pb-10 mt-5">
        <h2 className="text-xl font-semibold mb-4">Add New Shelf</h2>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded mb-3"
          value={newShelf.name}
          onChange={(e) => setNewShelf({ ...newShelf, name: e.target.value })}
        />
        <label className="block mb-2">Size</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded mb-3"
          value={newShelf.size}
          onChange={(e) => setNewShelf({ ...newShelf, size: e.target.value })}
        />
        <label className="block mb-2">Location</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded mb-3"
          value={newShelf.location}
          onChange={(e) => setNewShelf({ ...newShelf, location: e.target.value })}
        />
        <label className="block mb-2">Rent</label>
        <input
          type="number"
          className="border px-3 py-2 w-full rounded mb-3"
          value={newShelf.rent}
          onChange={(e) => setNewShelf({ ...newShelf, rent: parseInt(e.target.value) })}
        />
        <label className="block mb-2">Event Type</label>
        <select
          className="border px-3 py-2 w-full rounded mb-3"
          value={newShelf.event_type}
          onChange={(e) => setNewShelf({ ...newShelf, event_type: e.target.value })}
        >
          <option value="Retail / Pop-up store">Retail / Pop-up store</option>
          <option value="Art Exhibit / Gallery">Art Exhibit / Gallery</option>
          <option value="Corporate Event">Corporate Event</option>
          <option value="Workshop / Seminar">Workshop / Seminar</option>
          <option value="Food / Beverage Tasting">Food / Beverage Tasting</option>
          <option value="Book / Art Launch">Book / Art Launch</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="file"
          accept="image/*"
          className="border px-3 py-2 w-full rounded mb-3"
          onChange={(e) => setNewShelf({ ...newShelf, imgFile: e.target.files[0], imgPreview: URL.createObjectURL(e.target.files[0]) })}
        />
        {newShelf.imgPreview && (
          <img src={newShelf.imgPreview} alt="Preview" className="h-32 w-full object-cover rounded mb-3" />
        )}

        <label className="block mb-2">Visibility</label>
        <select
          className="border px-3 py-2 w-full rounded mb-3"
          value={newShelf.visibility}
          onChange={(e) => setNewShelf({ ...newShelf, visibility: e.target.value })}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={newShelf.is_active}
            onChange={(e) => setNewShelf({ ...newShelf, is_active: e.target.checked })}
            className="mr-2"
          />
          Active
        </label>

        <label className="block mb-2">
          <input
            type="checkbox"
            checked={newShelf.currently_available}
            onChange={(e) => setNewShelf({ ...newShelf, currently_available: e.target.checked })}
            className="mr-2"
          />
          Currently Available
        </label>

        <div className="flex gap-2">
          <button onClick={() => onSave(newShelf)} className="flex-1 bg-green-500 text-white py-2 rounded">Add Shelf</button>
          <button onClick={onCancel} className="flex-1 bg-gray-400 text-white py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>

  );
}

export default DsOwner;