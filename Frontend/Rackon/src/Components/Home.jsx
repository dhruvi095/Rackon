import React from "react";
import bgImage from "../assets/pic2.jpg"; // path to your image

function Home() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content on top */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find your space
        </h1>
        <p className="mb-6 text-lg md:text-xl">
          Rent shops, pop-up stores, showrooms and venues around the world.
        </p>

        {/* Search Box */}
        <div className="flex flex-col md:flex-row gap-2 justify-center">
          <input
            type="text"
            placeholder="Location"
            className="p-2 rounded-lg border text-black"
          />
          <select className="p-2 rounded-lg border text-black">
            <option>Type of event</option>
          </select>
          <select className="p-2 rounded-lg border text-black">
            <option>Duration</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
