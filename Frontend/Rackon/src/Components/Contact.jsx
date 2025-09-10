import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for contacting Rackon! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen text-black pt-20">
      <div className="text-center py-10 px-4 ">
        <h1 className="text-3xl md:text-5xl font-bold">Contact Us</h1>
        <p className="mt-3 text-lg text-black">
          We’d love to hear from you. Let’s get in touch!
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="bg-gray-200 text-black shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">
            Send us a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-gray-200 text-black shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">
            Get in touch
          </h2>
          <p className="text-gray-700 mb-4">
            Have questions about renting or listing shelves? Reach out to our
            support team.
          </p>
          <div className="space-y-3 text-gray-800">
            <p>
              <span className="font-semibold">📍 Address:</span> Rackon HQ,
              Mumbai, India
            </p>
            <p>
              <span className="font-semibold">📧 Email:</span>{" "}
              <a
                href="mailto:support@rackon.com"
                className="text-blue-600 hover:underline"
              >
                support@rackon.com
              </a>
            </p>
            <p>
              <span className="font-semibold">📞 Phone:</span>{" "}
              <a
                href="tel:+911234567890"
                className="text-blue-600 hover:underline"
              >
                +91 12345 67890
              </a>
            </p>
          </div>

          <div className="mt-6">
            <iframe
              title="Rackon Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609996392!2d72.7410992686981!3d19.08219783905506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63f48e1f9f7%3A0x2bd59d1a8d89f!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-64 rounded-lg border border-gray-300"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;