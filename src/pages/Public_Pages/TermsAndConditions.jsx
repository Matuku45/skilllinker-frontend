import React from "react";
import { FaFileContract, FaUserShield, FaBalanceScale, FaExclamationTriangle } from "react-icons/fa";

const TermsAndConditions = () => {
  const sections = [
    {
      icon: <FaFileContract className="text-blue-500 text-2xl" />,
      title: "Acceptance of Terms",
      content: "By accessing and using SkillLinker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      icon: <FaUserShield className="text-green-500 text-2xl" />,
      title: "User Responsibilities",
      content: "Users must provide accurate information, maintain confidentiality of account credentials, and use the platform only for legitimate professional purposes in accordance with applicable laws."
    },
    {
      icon: <FaBalanceScale className="text-yellow-500 text-2xl" />,
      title: "Platform Usage",
      content: "SkillLinker is provided 'as is' for connecting verified practitioners with SDPs. We reserve the right to modify or discontinue services with reasonable notice."
    },
    {
      icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
      title: "Prohibited Activities",
      content: "Users may not engage in fraudulent activities, share false credentials, violate intellectual property rights, or use the platform for unauthorized commercial purposes."
    }
  ];

  const lastUpdated = "November 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-600">
          Terms and Conditions
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Last updated: {lastUpdated}
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-gray-700 mb-6 leading-relaxed">
            These Terms and Conditions govern your use of the SkillLinker platform. By registering for or using our services, you agree to comply with these terms. Please read them carefully before proceeding.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            SkillLinker is operated by MetroSites, a South African company committed to facilitating professional connections in the skills development sector while maintaining the highest standards of integrity and compliance.
          </p>
        </div>

        {/* Key Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                {section.icon}
                <h2 className="text-xl font-semibold ml-3 text-gray-900">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Account Registration and Verification
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                To use SkillLinker, you must register an account and complete our verification process. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Update your information to keep it current</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Undergo and maintain verification status</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Professional Standards and Conduct
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                All users must maintain professional standards while using SkillLinker:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Adhere to South African skills development legislation</li>
                <li>Maintain professional qualifications and competencies</li>
                <li>Conduct business ethically and transparently</li>
                <li>Respect intellectual property and confidentiality</li>
                <li>Report any concerns about professional misconduct</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Service Availability and Modifications
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              While we strive for continuous availability, SkillLinker services may be temporarily unavailable due to maintenance, updates, or unforeseen circumstances. We reserve the right to modify, suspend, or discontinue any service with reasonable notice to users.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Intellectual Property
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              SkillLinker and its original content, features, and functionality are owned by MetroSites and are protected by South African and international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              SkillLinker shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount paid by you for the service in the twelve months preceding the claim.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Dispute Resolution
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Any disputes arising from these terms shall be resolved through good faith negotiations. If unresolved, disputes shall be subject to the exclusive jurisdiction of the South African courts, with Cape Town as the preferred venue.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Termination
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Either party may terminate this agreement at any time. Upon termination, your right to use the service ceases immediately. We reserve the right to terminate accounts that violate these terms or engage in prohibited activities.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Governing Law
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              These terms are governed by and construed in accordance with the laws of the Republic of South Africa. Any legal action or proceeding arising under these terms will be brought exclusively in the courts of South Africa.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              If you have questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> legal@skilllinker.co.za</p>
              <p className="text-gray-700"><strong>Phone:</strong> +27 (0)21 123 4567</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Skills Avenue, Cape Town, 8001, South Africa</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Changes to Terms
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of SkillLinker after changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Questions about our terms? We're here to help clarify.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Legal Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
