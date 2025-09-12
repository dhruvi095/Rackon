<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import useRazorpay from "../hooks/useRazorpay";
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import user from "../assets/user.png";
>>>>>>> 347d788501a250d344b416f6debff99664b513bf

function DsBrand() {
  const razorpayLoaded = useRazorpay();
  const [availableShelves, setAvailableShelves] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, shelves, bookings, profile
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const [bookingShelf, setBookingShelf] = useState(null); // holds shelf user wants to book
  const [bookingDates, setBookingDates] = useState({
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    fetchAvailableShelves();
    fetchBrandShelves();
    fetchMyBookings();
    fetchProfile();
  }, []);

  const [inventoryModal, setInventoryModal] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);


  const fetchShelfInventory = async (shelfId) => {
    try {
      const res = await api.get(`/products/?shelf=${shelfId}`);
      setInventoryItems(res.data);

      // find shelf object to show in modal header
      const shelf = brandShelves.find((s) => s.id === shelfId);
      setInventoryModal(shelf);
    } catch (err) {
      console.error("Error fetching shelf inventory:", err);
      alert("Failed to load inventory for this shelf.");
    }
  };



  const [productModalShelf, setProductModalShelf] = useState(null);
  const [productData, setProductData] = useState({
    product_name: "",
    price_per_unit: 0,
    quantity_stored: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);


  const [brandShelves, setBrandShelves] = useState([]);

  const fetchBrandShelves = async () => {
    try {
      const res = await api.get("/shelves/brand/active/");
      const shelvesWithImages = res.data.map(shelf => {
        if (shelf.image && shelf.image.startsWith("/media")) {
          return { ...shelf, image: `http://localhost:8000${shelf.image}` };
        }
        return shelf;
      });
      setBrandShelves(shelvesWithImages);
    } catch (err) {
      console.error("Error fetching brand shelves:", err);
    }
  };

  const fetchAvailableShelves = async () => {
    try {
      const res = await api.get("/shelves/available/");
      setAvailableShelves(res.data);
    } catch (err) {
      console.error("Error fetching available shelves:", err);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await api.get("/bookings/my/");
      setMyBookings(res.data);
    } catch (err) {
      console.error("Error fetching my bookings:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile/");
      const profileData = res.data;
      if (profileData.image && profileData.image.startsWith("/media")) {
        profileData.image = `http://localhost:8000${profileData.image}`;
      }
      setProfile(profileData);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleBookShelf = async (shelfId) => {
    try {
      await api.post("/bookings/", { shelf: shelfId });
      alert("Shelf booking requested successfully!");
      fetchMyBookings();
    } catch (err) {
      console.error("Error booking shelf:", err);
    }
  };

  const handleProfileSave = async () => {
    try {
      await api.put("/auth/profile/update/", {
        username: profile.name,
        email: profile.email,
        phone_number: profile.phone,
      });

      if (profile.imageFile) {
        const formData = new FormData();
        formData.append("profile_image", profile.imageFile);
        await api.patch("/auth/profile/upload_image/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Profile updated successfully!");
      fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login"; // redirect to login
  };


<<<<<<< HEAD


  return (
    <div className="flex min-h-screen bg-gray-100 pt-15">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between pt-8">
        <div>
          <div className="flex flex-col items-center mb-6">
            <img
              src={profile.image || "/default_avatar.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border mb-2"
            />
            <h2 className="font-semibold text-lg">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
=======
  const handlePayment = () => {
    navigate("/Brandpayment"); 
  };

  const handleSaveCategory = (cat) => {
    if (!cat) return;
    if (editingCategory) {
      setCategories(
        categories.map((c) => (c.id === cat.id ? { ...c, ...cat } : c))
      );
      setEditingCategory(null);
    } else {
      setCategories([...categories, { ...cat, id: Date.now(), products: [] }]);
      setAddingCategory(false);
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
    if (selectedCategory === id && categories.length > 1) {
      setSelectedCategory(categories[0].id);
    }
  };

  const handleSaveProduct = (prod) => {
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory
          ? editingProduct
            ? {
                ...cat,
                products: cat.products.map((p) =>
                  p.id === prod.id ? prod : p
                ),
              }
            : {
                ...cat,
                products: [...cat.products, { ...prod, id: Date.now() }],
              }
          : cat
      )
    );
    setEditingProduct(null);
    setAddingProduct(false);
  };

  const handleDeleteProduct = (prodId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory
          ? { ...cat, products: cat.products.filter((p) => p.id !== prodId) }
          : cat
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-white shadow-lg p-6 flex-shrink-0">
        <div className="flex flex-col items-center text-center mt-[65px]">
          <img
            src={user}
            alt="Profile"
            className="w-20 h-20 rounded-full border"
          />
          <h2 className="mt-3 text-lg font-semibold">BrandUser</h2>
          <p className="text-sm text-gray-500">brand@example.com</p>
          <div className="mt-6 w-full space-y-3">
            <button
              onClick={handleHistory}
              className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              History
            </button>
            <button
              onClick={handlePayment}
              className="w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
            >
              Payment
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Log Out
            </button>
>>>>>>> 347d788501a250d344b416f6debff99664b513bf
          </div>

          <nav className="flex flex-col gap-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-2 px-3 rounded ${activeTab === "dashboard"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
                }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("shelves")}
              className={`py-2 px-3 rounded ${activeTab === "shelves"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
                }`}
            >
              Shelves
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-2 px-3 rounded ${activeTab === "bookings"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
                }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-2 px-3 rounded ${activeTab === "profile"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
                }`}
            >
              Profile
            </button>
          </nav>
        </div>

        <button onClick={handleLogout} className="py-2 px-3 bg-red-600 text-white rounded hover:bg-red-700">
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6">
<<<<<<< HEAD
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Available Shelves</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {availableShelves.map((shelf) => (
                <div key={shelf.id} className="bg-white p-4 rounded-lg shadow flex flex-col">
                  <img
                    src={shelf.image || "/default_shelf.png"}
                    alt={shelf.name}
                    className="h-32 w-full object-cover rounded-md"
                  />
                  <h2 className="mt-3 font-semibold text-lg">{shelf.name}</h2>
                  <p className="text-sm text-gray-600"><strong>Size:</strong> {shelf.size}</p>
                  <p className="text-sm text-gray-600"><strong>Location:</strong> {shelf.location}</p>
                  <p className="text-sm text-gray-600"><strong>Rent:</strong> ₹{shelf.rent}</p>

=======
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Manage Categories & Products
        </h1>
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded ${
                  selectedCategory === cat.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
              <button
                onClick={() => setEditingCategory(cat)}
                className="bg-yellow-400 px-2 py-1 rounded text-white"
              >
                ✎
              </button>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="bg-red-500 px-2 py-1 rounded text-white"
              >
                🗑
              </button>
            </div>
          ))}
          <button
            onClick={() => setAddingCategory(true)}
            className="px-4 py-2 rounded bg-green-500 text-white"
          >
            + Add Category
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .find((cat) => cat.id === selectedCategory)
            ?.products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-4 rounded-lg shadow flex flex-col"
              >
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="h-32 w-full object-cover rounded-md"
                />
                <h2 className="mt-3 font-semibold text-lg">{prod.name}</h2>
                <p className="text-sm text-gray-600">
                  Size: {prod.size} | Location: {prod.location}
                </p>
                <p className="text-sm text-gray-600">Rent: ₹{prod.rent}</p>
                <p className="text-sm text-gray-600">
                  Visibility: {prod.visibility}
                </p>
                <div className="mt-4 flex gap-2">
>>>>>>> 347d788501a250d344b416f6debff99664b513bf
                  <button
                    onClick={() => {
                      setBookingShelf(shelf);
                      setBookingDates({ start_date: "", end_date: "" });
                    }}
                    className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Book Now
                  </button>
                </div>
<<<<<<< HEAD
              ))}

            </div>
          </div>
        )}



        {activeTab === "shelves" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">My Brand Shelves</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandShelves.map((shelf) => (
                <div key={shelf.id} className="bg-white p-4 rounded-lg shadow">
                  <img
                    src={shelf.image || "/default_shelf.png"}
                    alt={shelf.name}
                    className="h-32 w-full object-cover rounded-md"
                  />
                  <h2 className="mt-3 font-semibold text-lg">{shelf.name}</h2>
                  <p className="text-sm text-gray-600"><strong>Size:</strong> {shelf.size}</p>
                  <p className="text-sm text-gray-600"><strong>Location:</strong> {shelf.location}</p>
                  <p className="text-sm text-gray-600"><strong>Rent:</strong> ₹{shelf.rent}</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setEditingProduct(null);  // Reset form for adding
                        setProductData({
                          product_name: "",
                          price_per_unit: 0,
                          quantity_stored: 0,
                        });
                        setProductModalShelf(shelf);
                      }}
                    >
                      Add Inventory
                    </button>


                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={async () => {
                        try {
                          const res = await api.get("/products/");
                          const product = res.data.find(p => p.shelf === shelf.id);

                          if (product) {
                            setProductData({
                              product_name: product.product_name,
                              price_per_unit: product.price_per_unit,
                              quantity_stored: product.quantity_stored,
                            });
                            setEditingProduct(product);
                            setProductModalShelf(shelf);
                          } else {
                            alert("No product found for this shelf yet.");
                          }
                        } catch (err) {
                          console.error("Error fetching products:", err);
                        }
                      }}
                    >
                      Edit Inventory
                    </button>
                    <button
                      className="bg-purple-500 text-white px-3 py-1 rounded"
                      onClick={() => fetchShelfInventory(shelf.id)}
                    >
                      View Inventory
                    </button>


                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="py-2 px-4">Shelf</th>
                    <th className="py-2 px-4">Start Date</th>
                    <th className="py-2 px-4">End Date</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {myBookings.map((b) => (
                    <tr key={b.id} className="border-b">
                      <td className="py-2 px-4">{b.shelf_name}</td>
                      <td className="py-2 px-4">{new Date(b.start_date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{new Date(b.end_date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">₹{b.display_amount || b.amount || 0}</td>
                      <td className="py-2 px-4">{b.status}</td>
                      <td className="py-2 px-4">
                        {b.payment_status === "completed" ? (
                          <span className="text-green-600 font-semibold">Paid</span>
                        ) : (
                          <button
                            onClick={async () => {
                              try {
                                const res = await api.post(`/payments/booking/${b.id}/pay/`);

                                // Razorpay checkout
                                const options = {
                                  key: res.data.razorpay_key,
                                  amount: res.data.amount,
                                  currency: res.data.currency,
                                  order_id: res.data.razorpay_order_id,
                                  name: "Shelf Rental Payment",
                                  description: `Payment for booking ${b.id} (₹${res.data.display_amount || res.data.amount / 100})`,
                                  // checkout_version: 1, 
                                  handler: function (response) {
                                    // response = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
                                    axios.post("/api/payments/verify/", response)
                                      .then(res => console.log("Payment verified:", res.data))
                                      .catch(err => console.error("Verify failed:", err.response.data));
                                  },

                                  prefill: {
                                    name: profile.name,
                                    email: profile.email,
                                    contact: profile.phone,
                                  },
                                  theme: { color: "#3399cc" },
                                };
                                console.log("Backend amount (paise):", res.data.amount);
                                console.log("Creating Razorpay instance with:", options, window.Razorpay);

                                if (!window.Razorpay) {
                                  alert("Razorpay SDK failed to load. Please refresh the page.");
                                  return;
                                }

                                const rzp = new window.Razorpay(options);
                                rzp.open();
                              } catch (err) {
                                console.error("Payment error:", err.response?.data || err.message);
                                alert(err.response?.data?.detail || "Payment failed. Try again.");
                              }
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Pay Now
                          </button>
                        )}
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
                  src={profile.image || "/default_avatar.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      imageFile: e.target.files[0],
                      imagePreview: URL.createObjectURL(e.target.files[0]),
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
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="border px-3 py-2 w-full rounded"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
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
=======
              </div>
            ))}
          <div
            onClick={() => {
              setAddingProduct(true);
              setEditingProduct(null);
            }}
            className="bg-gray-200 p-4 rounded-lg shadow flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
          >
            <span className="text-4xl">➕</span>
            <p className="mt-2 font-semibold">Add New Product</p>
          </div>
        </div>
        {(editingCategory || addingCategory) && (
          <CategoryForm
            category={editingCategory}
            onSave={handleSaveCategory}
            onCancel={() => {
              setEditingCategory(null);
              setAddingCategory(false);
            }}
          />
        )}
        {(addingProduct || editingProduct) && (
          <ProductForm
            key={addingProduct ? "new-product" : editingProduct?.id}
            product={editingProduct || undefined}
            onSave={handleSaveProduct}
            onCancel={() => {
              setAddingProduct(false);
              setEditingProduct(null);
            }}
          />
>>>>>>> 347d788501a250d344b416f6debff99664b513bf
        )}
      </main>
      {bookingShelf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Book Shelf: {bookingShelf.name}</h2>

            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="border px-3 py-2 w-full rounded mb-3"
              value={bookingDates.start_date}
              onChange={(e) =>
                setBookingDates({ ...bookingDates, start_date: e.target.value })
              }
            />

            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              className="border px-3 py-2 w-full rounded mb-4"
              value={bookingDates.end_date}
              onChange={(e) =>
                setBookingDates({ ...bookingDates, end_date: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                className="flex-1 bg-indigo-600 text-white py-2 rounded"
                onClick={async () => {
                  try {
                    await api.post("/bookings/", {
                      shelf: bookingShelf.id,
                      start_date: bookingDates.start_date,
                      end_date: bookingDates.end_date,
                    });
                    alert("Shelf booked successfully!");
                    setBookingShelf(null);
                    fetchMyBookings(); // refresh bookings list
                  } catch (err) {
                    console.error("Booking error:", err);
                    alert("Failed to book shelf. Try again.");
                  }
                }}
              >
                Confirm Booking
              </button>
              <button
                className="flex-1 bg-gray-400 text-white py-2 rounded"
                onClick={() => setBookingShelf(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {productModalShelf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Inventory" : "Add Inventory"} for Shelf: {productModalShelf.name}
            </h2>

            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              className="border px-3 py-2 w-full rounded mb-3"
              value={productData.product_name}
              onChange={(e) => setProductData({ ...productData, product_name: e.target.value })}
            />

            <label className="block text-sm font-medium">Price Per Unit</label>
            <input
              type="number"
              className="border px-3 py-2 w-full rounded mb-3"
              value={productData.price_per_unit}
              onChange={(e) => setProductData({ ...productData, price_per_unit: e.target.value })}
            />

            <label className="block text-sm font-medium">Quantity Stored</label>
            <input
              type="number"
              className="border px-3 py-2 w-full rounded mb-4"
              value={productData.quantity_stored}
              onChange={(e) => setProductData({ ...productData, quantity_stored: e.target.value })}
            />

            <div className="flex gap-2">
              <button
                className="flex-1 bg-indigo-600 text-white py-2 rounded"
                onClick={async () => {
                  try {
                    if (editingProduct) {
                      // Update existing product
                      await api.put(`/products/${editingProduct.id}/`, {
                        ...productData,
                        shelf: productModalShelf.id,
                      });
                      alert("Product updated successfully!");
                    } else {
                      // Create new product linked to this shelf
                      await api.post("/products/", {
                        ...productData,
                        shelf: productModalShelf.id,
                      });
                      alert("Product added successfully!");
                    }

                    setProductModalShelf(null);
                    setEditingProduct(null);
                  } catch (err) {
                    console.error("Error updating product:", err);
                    alert("Failed to save product.");
                  }
                }}
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>

              <button
                className="flex-1 bg-gray-400 text-white py-2 rounded"
                onClick={() => {
                  setProductModalShelf(null);
                  setEditingProduct(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {inventoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              Inventory for Shelf: {inventoryModal.name}
            </h2>
            {inventoryItems.length > 0 ? (
              <table className="min-w-full bg-white border rounded">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="py-2 px-4">Product</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Quantity Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 px-4">{item.product_name}</td>
                      <td className="py-2 px-4">₹{item.price_per_unit}</td>
                      <td className="py-2 px-4">{item.quantity_stored}</td>
                      <td className="py-2 px-4">{item.quantity_sold || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No inventory found for this shelf.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setInventoryModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}

<<<<<<< HEAD
export default DsBrand;
=======
function CategoryForm({ category, onSave, onCancel }) {
  const initial = category ?? {};
  const [cat, setCat] = useState(initial?.id ? { ...initial } : { name: "" });

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3">
      <h2 className="font-bold text-lg">
        {initial?.id ? "Edit Category" : "Add New Category"}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Category Name</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded"
          value={cat.name}
          onChange={(e) => setCat({ ...cat, name: e.target.value })}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave(cat)}
          className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-gray-400 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ProductForm({ product = {}, onSave, onCancel }) {
  const [prod, setProd] = useState(
    product.id
      ? product
      : {
          name: "",
          location: "",
          size: "",
          rent: "",
          img: "",
          visibility: "public",
        }
  );

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3">
      <h2 className="font-bold text-lg">
        {product.id ? "Edit Product" : "Add New Product"}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded"
          value={prod.name}
          onChange={(e) => setProd({ ...prod, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded"
          value={prod.location}
          onChange={(e) => setProd({ ...prod, location: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Size</label>
        <input
          type="text"
          className="border px-3 py-2 w-full rounded"
          value={prod.size}
          onChange={(e) => setProd({ ...prod, size: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Rent (₹)</label>
        <input
          type="number"
          className="border px-3 py-2 w-full rounded"
          value={prod.rent}
          onChange={(e) => setProd({ ...prod, rent: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          className="border px-3 py-2 w-full rounded"
          onChange={(e) =>
            setProd({ ...prod, img: URL.createObjectURL(e.target.files[0]) })
          }
        />
        {prod.img && (
          <img
            src={prod.img}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded-md border"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Visibility</label>
        <select
          className="border px-3 py-2 w-full rounded"
          value={prod.visibility}
          onChange={(e) => setProd({ ...prod, visibility: e.target.value })}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave(prod)}
          className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-gray-400 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DsBrand;
>>>>>>> 347d788501a250d344b416f6debff99664b513bf
