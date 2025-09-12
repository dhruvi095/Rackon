import React, { useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const articles = [
  {
    id: 1,
    title: "Greens in Glass Jars: A Small Retailer's Big Story",
    author: "Rackon Editorial",
    date: "Aug 12, 2025",
    category: "Success Story",
    cover: img1,
    excerpt:
      "A small grocery store in Mehsana wasn’t getting enough footfall, until they listed shelves on Rackon. Brands came on board and things changed…",
    content: [
      "Shambhubhai’s general store had regular customers but slow-moving stock. Once he listed shelves on Rackon, three local brands—pickles, herbal tea, and handmade soaps—rented space.",
      "In the first month, shelf rent added $150 extra income, while cross-selling boosted sales of his own products by 18%.",
      "With display guidelines, price tagging, and stock tracking handled by the Rackon dashboard, Shambhubhai says: 'Empty space now earns steady income and builds community connections.'",
    ],
  },
  {
    id: 2,
    title: "How Herbal Tea Found Its Place in the Market",
    author: "Rackon Editorial",
    date: "Sep 3, 2025",
    category: "Brand Journey",
    cover: img2,
    excerpt:
      "A homegrown herbal tea startup struggled to find visibility in retail stores. Rackon became their launchpad…",
    content: [
      "Priya’s herbal tea brand began in her kitchen. Online sales were slow, and supermarkets rejected her small-scale business.",
      "With Rackon, she placed products in five local grocery stores. Customers started sampling, and repeat orders grew fast.",
      "In six months, Priya scaled production by 3x and hired two women from her village. Today, she sells both online and offline, with Rackon as her growth partner.",
    ],
  },
  {
    id: 3,
    title: "From Local Pickles to Popular Demand",
    author: "Rackon Editorial",
    date: "Oct 18, 2025",
    category: "Growth Story",
    cover: img3,
    excerpt:
      "A family-run pickle business found its way from kitchen shelves to community stores with Rackon’s shelf network…",
    content: [
      "Sunita and her mother started making mango and lemon pickles at home, selling only to neighbors.",
      "After joining Rackon, their jars were placed in four nearby grocery shops, where visibility skyrocketed.",
      "Within 3 months, orders doubled, and they expanded into new flavors while hiring local helpers to meet demand.",
    ],
  },
  {
    id: 4,
    title: "Handmade Soaps That Built a Community Brand",
    author: "Rackon Editorial",
    date: "Nov 5, 2025",
    category: "Entrepreneurship",
    cover: img4,
    excerpt:
      "What began as a hobby turned into a profitable venture when Aarti introduced her handmade soaps through Rackon…",
    content: [
      "Aarti’s handmade soap collection started as gifts for friends. Interest grew quickly, but local shops were hesitant to stock small batches.",
      "Rackon connected her with retailers willing to showcase her products on consignment.",
      "Today, her soaps are sold in 10 shops across the district, and she has trained three women in her village to join her growing brand.",
    ],
  },
];

function Magazine() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-12 mt-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Rackon Magazine
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img
              src={article.cover}
              alt={article.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <p className="text-sm text-green-600 font-medium">
                {article.category}
              </p>
              <h2 className="text-lg font-semibold mt-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mt-2 flex-grow">
                {article.excerpt}
              </p>
              <button
                onClick={() => setSelectedArticle(article)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <img
              src={selectedArticle.cover}
              alt="Cover"
              className="w-full h-64 object-cover rounded-t-2xl"
            />

            <div className="p-6">
              <p className="text-sm text-gray-500 mb-1">
                {selectedArticle.author} • {selectedArticle.date}
              </p>
              <h2 className="text-2xl font-bold mb-4">
                {selectedArticle.title}
              </h2>
              {selectedArticle.content.map((para, i) => (
                <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Magazine;
