import React from "react";

const PP = () => {
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <div className="text-center py-10 px-4 sm:py-14 md:py-16 bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
          Your privacy is important to us. Please read how Rackon collects, uses,
          and protects your information.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-gray-100 text-black shadow-lg rounded-2xl p-5 sm:p-8 md:p-10 lg:p-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
            Our Commitment to Your Privacy
          </h2>
          <p className="mb-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            Rackon values your trust. This Privacy Policy outlines how we handle
            your data when you use our services.
          </p>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                1. Information We Collect
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                We may collect personal details such as your name, email, phone
                number, location, and payment information when you register or
                use our platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                2. How We Use Your Information
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                We use your information to provide services, process payments,
                improve user experience, send updates, and ensure the safety of
                our platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                3. Sharing of Data
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                We do not sell your data. Information is only shared with trusted
                partners (such as payment providers) to complete transactions and
                comply with legal requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                4. Data Security
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                We implement strong measures to protect your personal data.
                However, no online platform is completely secure, and users
                should take precautions while sharing information.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                5. Your Rights
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                You can request access, correction, or deletion of your personal
                data anytime by contacting our support team.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                6. Updates to Policy
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                Rackon may update this Privacy Policy from time to time. We
                encourage users to review it periodically to stay informed.
              </p>
            </div>
          </div>
          <p className="text-gray-700 mt-10 text-sm sm:text-base md:text-lg leading-relaxed">
            If you have any questions regarding this Privacy Policy, please
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

export default PP;