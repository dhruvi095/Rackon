// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ for navigation
// import user from "../assets/user.png";

// function DsBrand() {
//   const [categories, setCategories] = useState([
//     {
//       id: 1,
//       name: "Medicine Shelf",
//       products: [
//         {
//           id: 1,
//           name: "Paracetamol",
//           location: "Block A",
//           size: "Small",
//           rent: 100,
//           img: "https://via.placeholder.com/150",
//           visibility: "public",
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "Grocery Shelf",
//       products: [
//         {
//           id: 2,
//           name: "Rice 5kg",
//           location: "Block B",
//           size: "Medium",
//           rent: 200,
//           img: "https://via.placeholder.com/150",
//           visibility: "public",
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: "Small Shop Shelf",
//       products: [
//         {
//           id: 3,
//           name: "Tea Pack",
//           location: "Block C",
//           size: "Small",
//           rent: 50,
//           img: "https://via.placeholder.com/150",
//           visibility: "public",
//         },
//         {
//           id: 4,
//           name: "Cold Drink",
//           location: "Block D",
//           size: "Small",
//           rent: 60,
//           img: "https://via.placeholder.com/150",
//           visibility: "public",
//         },
//       ],
//     },
//   ]);

//   const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [addingProduct, setAddingProduct] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [addingCategory, setAddingCategory] = useState(false);

//   const navigate = useNavigate(); // ✅ init navigation

//   const handleLogout = () => {
//     navigate("/Login"); // redirect to login page
//   };

//   const handleHistory = () => {
//     navigate("/Brandhistory"); // ✅ go to Brandhistory page
//   };

//   const handlePayment = () => {
//     navigate("/Brandpayment"); // ✅ go to Brandpayment page
//   };

//   const handleSaveCategory = (cat) => {
//     if (editingCategory) {
//       setCategories(
//         categories.map((c) => (c.id === cat.id ? { ...c, name: cat.name } : c))
//       );
//       setEditingCategory(null);
//     } else {
//       setCategories([...categories, { ...cat, id: Date.now(), products: [] }]);
//       setAddingCategory(false);
//     }
//   };

//   const handleDeleteCategory = (id) => {
//     setCategories(categories.filter((c) => c.id !== id));
//     if (selectedCategory === id && categories.length > 1) {
//       setSelectedCategory(categories[0].id);
//     }
//   };

//   const handleSaveProduct = (prod) => {
//     setCategories(
//       categories.map((cat) =>
//         cat.id === selectedCategory
//           ? editingProduct
//             ? {
//                 ...cat,
//                 products: cat.products.map((p) =>
//                   p.id === prod.id ? prod : p
//                 ),
//               }
//             : {
//                 ...cat,
//                 products: [...cat.products, { ...prod, id: Date.now() }],
//               }
//           : cat
//       )
//     );
//     setEditingProduct(null);
//     setAddingProduct(false);
//   };

//   const handleDeleteProduct = (prodId) => {
//     setCategories(
//       categories.map((cat) =>
//         cat.id === selectedCategory
//           ? { ...cat, products: cat.products.filter((p) => p.id !== prodId) }
//           : cat
//       )
//     );
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-full md:w-64 bg-white shadow-lg p-6 flex-shrink-0">
//         <div className="flex flex-col items-center text-center mt-[65px]">
//           <img
//             src={user}
//             alt="Profile"
//             className="w-20 h-20 rounded-full border"
//           />
//           <h2 className="mt-3 text-lg font-semibold">BrandUser</h2>
//           <p className="text-sm text-gray-500">brand@example.com</p>

//           {/* Action Buttons */}
//           <div className="mt-6 w-full space-y-3">
//             <button
//               onClick={handleHistory}
//               className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
//             >
//               History
//             </button>
//             <button
//               onClick={handlePayment}
//               className="w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
//             >
//               Payment
//             </button>
//             <button
//               onClick={handleLogout}
//               className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl md:text-3xl font-bold mb-6">
//           Manage Categories & Products
//         </h1>

//         {/* Category Buttons */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           {categories.map((cat) => (
//             <div key={cat.id} className="flex items-center gap-2">
//               <button
//                 onClick={() => setSelectedCategory(cat.id)}
//                 className={`px-4 py-2 rounded ${
//                   selectedCategory === cat.id
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {cat.name}
//               </button>
//               <button
//                 onClick={() => setEditingCategory(cat)}
//                 className="bg-yellow-400 px-2 py-1 rounded text-white"
//               >
//                 ✎
//               </button>
//               <button
//                 onClick={() => handleDeleteCategory(cat.id)}
//                 className="bg-red-500 px-2 py-1 rounded text-white"
//               >
//                 🗑
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={() => setAddingCategory(true)}
//             className="px-4 py-2 rounded bg-green-500 text-white"
//           >
//             + Add Category
//           </button>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {categories
//             .find((cat) => cat.id === selectedCategory)
//             ?.products.map((prod) => (
//               <div
//                 key={prod.id}
//                 className="bg-white p-4 rounded-lg shadow flex flex-col"
//               >
//                 <img
//                   src={prod.img}
//                   alt={prod.name}
//                   className="h-32 w-full object-cover rounded-md"
//                 />
//                 <h2 className="mt-3 font-semibold text-lg">{prod.name}</h2>
//                 <p className="text-sm text-gray-600">
//                   Size: {prod.size} | Location: {prod.location}
//                 </p>
//                 <p className="text-sm text-gray-600">Rent: ₹{prod.rent}</p>
//                 <p className="text-sm text-gray-600">
//                   Visibility: {prod.visibility}
//                 </p>
//                 <div className="mt-4 flex gap-2">
//                   <button
//                     onClick={() => setEditingProduct(prod)}
//                     className="flex-1 bg-yellow-500 text-white py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteProduct(prod.id)}
//                     className="flex-1 bg-red-500 text-white py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => alert(`Booking product: ${prod.name}`)}
//                     className="flex-1 bg-green-600 text-white py-1 rounded"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             ))}

//           {/* Add New Product Card */}
//           <div
//             onClick={() => {
//               setAddingProduct(true);
//               setEditingProduct(null);
//             }}
//             className="bg-gray-200 p-4 rounded-lg shadow flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
//           >
//             <span className="text-4xl">➕</span>
//             <p className="mt-2 font-semibold">Add New Product</p>
//           </div>
//         </div>

//         {/* Category Form */}
//         {(editingCategory || addingCategory) && (
//           <CategoryForm
//             category={editingCategory}
//             onSave={handleSaveCategory}
//             onCancel={() => {
//               setEditingCategory(null);
//               setAddingCategory(false);
//             }}
//           />
//         )}

//         {/* Product Form */}
//         {(addingProduct || editingProduct) && (
//           <ProductForm
//             key={addingProduct ? "new-product" : editingProduct?.id}
//             product={editingProduct || undefined}
//             onSave={handleSaveProduct}
//             onCancel={() => {
//               setAddingProduct(false);
//               setEditingProduct(null);
//             }}
//           />
//         )}
//       </main>
//     </div>
//   );
// }



// function CategoryForm({ category = {}, onSave, onCancel }) {
//   const [cat, setCat] = useState(category.id ? category : { name: "" });

//   return (
//     <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3">
//       <h2 className="font-bold text-lg">
//         {category.id ? "Edit Category" : "Add New Category"}
//       </h2>

//       <div>
//         <label className="block text-sm font-medium mb-1">Category Name</label>
//         <input
//           type="text"
//           className="border px-3 py-2 w-full rounded"
//           value={cat.name}
//           onChange={(e) => setCat({ ...cat, name: e.target.value })}
//         />
//       </div>

//       <div className="flex gap-2">
//         <button
//           onClick={() => onSave(cat)}
//           className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
//         >
//           Save
//         </button>
//         <button
//           onClick={onCancel}
//           className="flex-1 py-2 bg-gray-400 text-white rounded-lg"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// function ProductForm({ product = {}, onSave, onCancel }) {
//   const [prod, setProd] = useState(
//     product.id
//       ? product
//       : {
//           name: "",
//           location: "",
//           size: "",
//           rent: "",
//           img: "",
//           visibility: "public",
//         }
//   );

//   return (
//     <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3">
//       <h2 className="font-bold text-lg">
//         {product.id ? "Edit Product" : "Add New Product"}
//       </h2>

//       <div>
//         <label className="block text-sm font-medium mb-1">Product Name</label>
//         <input
//           type="text"
//           className="border px-3 py-2 w-full rounded"
//           value={prod.name}
//           onChange={(e) => setProd({ ...prod, name: e.target.value })}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Location</label>
//         <input
//           type="text"
//           className="border px-3 py-2 w-full rounded"
//           value={prod.location}
//           onChange={(e) => setProd({ ...prod, location: e.target.value })}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Size</label>
//         <input
//           type="text"
//           className="border px-3 py-2 w-full rounded"
//           value={prod.size}
//           onChange={(e) => setProd({ ...prod, size: e.target.value })}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Rent (₹)</label>
//         <input
//           type="number"
//           className="border px-3 py-2 w-full rounded"
//           value={prod.rent}
//           onChange={(e) => setProd({ ...prod, rent: e.target.value })}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Product Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           className="border px-3 py-2 w-full rounded"
//           onChange={(e) =>
//             setProd({ ...prod, img: URL.createObjectURL(e.target.files[0]) })
//           }
//         />
//         {prod.img && (
//           <img
//             src={prod.img}
//             alt="Preview"
//             className="mt-2 w-32 h-32 object-cover rounded-md border"
//           />
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Visibility</label>
//         <select
//           className="border px-3 py-2 w-full rounded"
//           value={prod.visibility}
//           onChange={(e) => setProd({ ...prod, visibility: e.target.value })}
//         >
//           <option value="public">Public</option>
//           <option value="private">Private</option>
//         </select>
//       </div>

//       <div className="flex gap-2">
//         <button
//           onClick={() => onSave(prod)}
//           className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
//         >
//           Save
//         </button>
//         <button
//           onClick={onCancel}
//           className="flex-1 py-2 bg-gray-400 text-white rounded-lg"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DsBrand;
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import user from "../assets/user.png";

function DsBrand() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Medicine Shelf",
      products: [
        {
          id: 1,
          name: "Paracetamol",
          location: "Block A",
          size: "Small",
          rent: 100,
          img: "https://via.placeholder.com/150",
          visibility: "public",
        },
      ],
    },
    {
      id: 2,
      name: "Grocery Shelf",
      products: [
        {
          id: 2,
          name: "Rice 5kg",
          location: "Block B",
          size: "Medium",
          rent: 200,
          img: "https://via.placeholder.com/150",
          visibility: "public",
        },
      ],
    },
    {
      id: 3,
      name: "Small Shop Shelf",
      products: [
        {
          id: 3,
          name: "Tea Pack",
          location: "Block C",
          size: "Small",
          rent: 50,
          img: "https://via.placeholder.com/150",
          visibility: "public",
        },
        {
          id: 4,
          name: "Cold Drink",
          location: "Block D",
          size: "Small",
          rent: 60,
          img: "https://via.placeholder.com/150",
          visibility: "public",
        },
      ],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [addingCategory, setAddingCategory] = useState(false);

  const navigate = useNavigate(); // ✅ init navigation

  const handleLogout = () => {
    navigate("/Login"); // redirect to login page
  };

  const handleHistory = () => {
    navigate("/Brandhistory"); // ✅ go to Brandhistory page
  };

  const handlePayment = () => {
    navigate("/Brandpayment"); // ✅ go to Brandpayment page
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
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-6 flex-shrink-0">
        <div className="flex flex-col items-center text-center mt-[65px]">
          <img
            src={user}
            alt="Profile"
            className="w-20 h-20 rounded-full border"
          />
          <h2 className="mt-3 text-lg font-semibold">BrandUser</h2>
          <p className="text-sm text-gray-500">brand@example.com</p>

          {/* Action Buttons */}
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
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Manage Categories & Products
        </h1>

        {/* Category Buttons */}
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

        {/* Products Grid */}
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
                  <button
                    onClick={() => setEditingProduct(prod)}
                    className="flex-1 bg-yellow-500 text-white py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(prod.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => alert(`Booking product: ${prod.name}`)}
                    className="flex-1 bg-green-600 text-white py-1 rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}

          {/* Add New Product Card */}
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

        {/* Category Form */}
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

        {/* Product Form */}
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
        )}
      </main>
    </div>
  );
}

// ✅ FIXED CategoryForm
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
