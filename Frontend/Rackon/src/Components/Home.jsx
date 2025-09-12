import React, { useState, useEffect } from "react";
import bgImage from "../assets/pic2.png";
import img1 from "../assets/img1.jpg";
import axios from "axios";

function Home() {
  const [role, setRole] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [locationInput, setLocationInput] = useState("");
  const [eventTypeInput, setEventTypeInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

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

  const fetchShelves = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/shelves/", {
        params,
      });
      setSpaces(response.data.filter((shelf) => shelf.currently_available));
    } catch (error) {
      console.error("Error fetching shelves:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = {};
    if (locationInput) params.location = locationInput;
    if (eventTypeInput) params.event_type = eventTypeInput;
    if (sizeInput) params.size = sizeInput;

    fetchShelves(params);
  };

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/shelves/");
        setSpaces(response.data.filter((shelf) => shelf.currently_available));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shelves:", error);
        setLoading(false);
      }
    };

    fetchShelves();
  }, []);

  return (
    <>
      <div
        className="h-screen w-full flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            Find and Rent Retail Shelf Space Near You
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Rackon connects shop owners with brands to rent shelves and grow
            together.
          </p>

          {!role ? (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setRole("owner")}
                className="px-6 py-2 rounded-lg font-medium border bg-white text-gray-700 hover:bg-green-100 transition"
              >
                I’m a Shelf Owner
              </button>
              <button
                onClick={() => setRole("brand")}
                className="px-6 py-2 rounded-lg font-medium border bg-white text-gray-700 hover:bg-green-100 transition"
              >
                I’m a Brand
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Location"
                className="p-2 rounded-lg border w-full sm:w-auto text-white border-white placeholder-white bg-transparent"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />

              <select
                className="p-2 rounded-lg border w-full sm:w-auto text-white border-white bg-transparent"
                value={eventTypeInput}
                onChange={(e) => setEventTypeInput(e.target.value)}
              >
                <option className="text-black" value="">
                  Type of Event
                </option>
                <option className="text-black" value="Retail / Pop-up store">
                  Retail / Pop-up store
                </option>
                <option className="text-black" value="Art Exhibit / Gallery">
                  Art Exhibit / Gallery
                </option>
                <option className="text-black" value="Corporate Event">
                  Corporate Event
                </option>
              </select>

              <select
                className="p-2 rounded-lg border w-full sm:w-auto text-white border-white bg-transparent"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
              >
                <option className="text-black" value="">
                  Size
                </option>
                <option className="text-black" value="Small">
                  Small
                </option>
                <option className="text-black" value="Medium">
                  Medium
                </option>
                <option className="text-black" value="Large">
                  Large
                </option>
              </select>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                onClick={handleSearch}
              >
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
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="text-3xl font-bold">Explore Spaces</h2>
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition">
              View All Shelves
            </button>
          </div>

          {loading ? (
            <p>Loading shelves...</p>
          ) : spaces.length === 0 ? (
            <p>No available shelves at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {spaces.map((space) => (
                <div
                  key={space.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <img
                    src={
                      space.images?.[0]?.image || space.image || "/placeholder.jpg"
                    }
                    alt={space.event_type || "Shelf"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {space.location}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                     <strong>Space Size:</strong> {space.size} 
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                     <strong>Event Type:</strong> {space.event_type || "General"} 
                    </p>
                    <p className="text-green-600 font-semibold mt-2">
                      ₹{space.rent} / month
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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