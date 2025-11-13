import React from "react";
import { FaShieldAlt, FaLock, FaEye, FaUserCheck } from "react-icons/fa";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FaShieldAlt className="text-blue-500 text-2xl" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide (name, email, contact details)",
        "Professional credentials and qualifications",
        "Profile information and work history",
        "Communication data and project details",
        "Usage data and platform analytics"
      ]
    },
    {
      icon: <FaLock className="text-green-500 text-2xl" />,
      title: "How We Use Your Information",
      content: [
        "To verify practitioner qualifications and credentials",
        "To facilitate connections between SDPs and practitioners",
        "To provide platform services and support",
        "To improve our services and develop new features",
        "To communicate important updates and notifications"
      ]
    },
    {
      icon: <FaEye className="text-yellow-500 text-2xl" />,
      title: "Information Sharing",
      content: [
        "With verified SDPs for legitimate business purposes",
        "With regulatory bodies for compliance verification",
        "With service providers who assist our operations",
        "Only with your explicit consent for other purposes",
        "Never sold to third parties for marketing purposes"
      ]
    },
    {
      icon: <FaUserCheck className="text-purple-500 text-2xl" />,
      title: "Your Rights and Choices",
      content: [
        "Access and review your personal information",
        "Correct inaccurate or incomplete data",
        "Request deletion of your account and data",
        "Opt-out of non-essential communications",
        "Control visibility of your professional profile"
      ]
    }
  ];

  const lastUpdated = "November 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-600">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Last updated: {lastUpdated}
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-gray-700 mb-6 leading-relaxed">
            At SkillLinker, we are committed to protecting your privacy and ensuring the security of your personal and professional information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            By using SkillLinker, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
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
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Data Security
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure data centers and infrastructure</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Cookies and Tracking
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie preferences through your browser settings, though disabling cookies may limit some platform functionality.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              International Data Transfers
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Your information may be transferred to and processed in countries other than South Africa. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Data Retention
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We retain your personal information only as long as necessary for the purposes outlined in this policy, unless a longer retention period is required by law. When we no longer need your information, we securely delete or anonymize it.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Children's Privacy
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will promptly delete it.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> privacy@skilllinker.co.za</p>
              <p className="text-gray-700"><strong>Phone:</strong> +27 (0)21 123 4567</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Skills Avenue, Cape Town, 8001, South Africa</p>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have questions about your privacy? We're here to help.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Privacy Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
