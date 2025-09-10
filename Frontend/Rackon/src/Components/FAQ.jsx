import React, { useState } from "react";

const faqs = [
  {
    question: "What is Rackon?",
    answer:
      "Rackon is a platform that connects shop owners and brands for shelf rentals, making it easier to showcase and promote products.",
  },
  {
    question: "How do I list my shop shelves?",
    answer:
      "Simply create an account, go to the 'List Your Shelf' section, and provide details such as location, shelf size, and availability.",
  },
  {
    question: "Is Rackon available in all cities?",
    answer:
      "Currently, Rackon operates in major Indian cities, but we are expanding rapidly to cover more locations.",
  },
  {
    question: "How secure are payments on Rackon?",
    answer:
      "All transactions are processed through secure and trusted payment gateways. Rackon does not store your payment details.",
  },
  {
    question: "Can I cancel a shelf rental?",
    answer:
      "Yes, cancellations are allowed as per our cancellation policy. Please check the Terms & Conditions for details.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach us anytime at support@rackon.com or through the Contact Us page.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const suggestions = faqs
    .filter(
      (faq) =>
        searchQuery &&
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white text-black pt-20">

      <div className="text-center py-10 px-4 sm:py-14 md:py-16 bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
          Find answers to the most common questions about Rackon.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <input
          type="text"
          placeholder="Search your question..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className="w-full border border-gray-300 rounded-xl py-3 px-4 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base sm:text-lg"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-2 shadow-lg z-10">
            {suggestions.map((faq, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(faq.question)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
              >
                {faq.question}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-gray-100 shadow-lg rounded-2xl p-5 sm:p-8 md:p-10">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full py-4 text-left"
                >
                  <span className="text-base sm:text-lg md:text-xl font-medium text-black">
                    {faq.question}
                  </span>
                  <span className="text-xl sm:text-2xl text-gray-600">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="pb-4 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-6 text-base sm:text-lg">
              No results found. Please try another question.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;