import React from "react";

const TC = () => {
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-700">
          Please read our terms carefully before using Rackon.
        </p>
      </div>

      {/* Terms Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gray-100 text-black shadow-lg rounded-2xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            Welcome to Rackon
          </h2>
          <p className="mb-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            By accessing or using our website and services, you agree to the
            following Terms & Conditions. Please review them carefully.
          </p>

          {/* Sections */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                1. Acceptance of Terms
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                By registering, browsing, or using Rackon, you acknowledge that
                you have read, understood, and agree to comply with these Terms
                & Conditions.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                2. User Responsibilities
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Users are responsible for maintaining accurate account
                information, ensuring proper use of the platform, and complying
                with local laws and regulations.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                3. Shelf Listings & Rentals
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Rackon connects shop owners and brands for shelf rentals. We are
                not liable for disputes between parties. All rental agreements
                must be honored as per mutual consent.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                4. Payments
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Payments made through Rackon are secure. However, Rackon is not
                responsible for losses due to incorrect information or
                third-party payment failures.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                5. Termination of Use
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                We reserve the right to suspend or terminate accounts that
                violate our policies or engage in fraudulent activities.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                6. Changes to Terms
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Rackon may update these Terms & Conditions at any time.
                Continued use of the platform indicates acceptance of updated
                terms.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mt-10 text-sm sm:text-base leading-relaxed">
            If you have any questions about these Terms & Conditions, please
            contact us at{" "}
            <a
              href="mailto:support@rackon.com"
              className="text-blue-600 hover:underline"
            >
              support@rackon.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TC;
