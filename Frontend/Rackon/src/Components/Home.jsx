
import React, { useState } from "react";
import bgImage from "../assets/pic2.jpg"; // path to your image
import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
function Home() {
    const [role, setRole] = useState(null); // "owner" | "brand"

  const baseStyle =
    "px-6 py-2 rounded-lg font-medium transition border";
  const activeStyle =
    "bg-green-500 text-white border-green-500";
  const inactiveStyle =
    "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";
 const benefits = [
    {
      icon: "💰",
      title: "Extra income for shop owners",
      desc: "Monetize unused shelf space with effortless recurring rent.",
    },
    {
      icon: "📦",
      title: "Easy visibility for brands",
      desc: "Place your products in real stores where customers already shop.",
    },
    {
      icon: "📊",
      title: "Real-time sales insights",
      desc: "Track stock, sales, and performance with a live dashboard.",
    },
    {
      icon: "🔒",
      title: "Secure payments",
      desc: "Automated, protected transactions for both sides.",
    },
  ];
   const spaces = [
    {
      id: 1,
      image: img1,
      location: "Mumbai, India",
      size: "Medium",
      event: "Retail / Pop-up",
      price: "₹5,000 / month",
    },
    {
      id: 2,
      image: img2,
      location: "Delhi, India",
      size: "Large",
      event: "Showroom",
      price: "₹8,000 / month",
    },
    {
      id: 3,
      image: img3,
      location: "Bangalore, India",
      size: "Small",
      event: "Art Exhibit",
      price: "₹3,500 / month",
    },
  ];
   const testimonials = [
    {
      id: 1,
      name: "Amit Sharma",
      role: "Shop Owner – Mumbai",
      quote:
        "Rackon helped me earn extra income by renting unused shelves in my store. The process was simple and payments are always on time!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Desai",
      role: "Brand Owner – Delhi",
      quote:
        "With Rackon, my products gained visibility in local stores. Sales improved by 40% and I can track everything in real time.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];
    return (
        <>
        <div
            className="h-[70vh] w-full bg-cover bg-center flex items-center justify-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Overlay for dark effect */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content on top */}
            <div className="relative z-10 text-center text-white">
                {/* <h1 className="text-4xl md:text-6xl font-bold mb-4"> */}
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">

                    Find and Rent Retail Shelf Space Near You
                </h1>
                <p className="mb-6 text-lg md:text-xl">
                   Rackon connects shop owners with brands to rent shelves and grow together.
                </p>
                  {!role && (
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setRole("owner")}
            className="px-6 py-2 rounded-lg font-medium transition border bg-white text-gray-700 hover:bg-green-100"
          >
            I’m a Shelf Owner
          </button>
          <button
            onClick={() => setRole("brand")}
            className="px-6 py-2 rounded-lg font-medium transition border bg-white text-gray-700 hover:bg-green-100"
          >
            I’m a Brand
          </button>
        </div>
      )}
         {role && (
        <div className="flex justify-center gap-4">
          <input
            type="text"
            placeholder="Location"
            className="p-2 rounded-lg border"
          />
          <select className="p-2 rounded-lg border ">
            <option disabled selected>
              Type of Event
            </option>
            <option>Retail / Pop-up store</option>
            <option>Art Exhibit / Gallery</option>
            <option>Corporate Event</option>
          </select>
          <select className="p-2 rounded-lg border">
            <option disabled selected>
              Size
            </option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </div>
      )}
            </div>
        </div>

    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Rackon?</h2>
          <p className="text-gray-600 mt-3">
            A marketplace built for shop owners and brands to grow together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="font-semibold text-lg">{b.title}</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
 <section className="w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Spaces</h2>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition">
            View All Shelves
          </button>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={space.image}
                alt={space.event}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">{space.location}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {space.size} • {space.event}
                </p>
                <p className="text-green-600 font-semibold mt-2">{space.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
          <p className="text-gray-600 mt-3">
            Real stories from shop owners and brands using Rackon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-lg">{t.name}</h3>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>

        </>
    );
}

export default Home;
