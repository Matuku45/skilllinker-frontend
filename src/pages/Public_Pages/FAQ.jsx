import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is SkillLinker?",
      answer: "SkillLinker is a web-based platform that connects verified Assessors, Moderators, and Skills Development Providers (SDPs) in South Africa's professional training ecosystem. It serves as a digital marketplace for finding opportunities and building professional networks."
    },
    {
      question: "How do I get verified as an Assessor or Moderator?",
      answer: "To get verified, you need to submit your credentials, qualifications, and experience through our platform. Our team reviews your application and conducts necessary checks. Once approved, you'll receive a verified badge and can start connecting with SDPs."
    },
    {
      question: "Is SkillLinker free to use?",
      answer: "SkillLinker offers both free and premium features. Basic profile creation and browsing is free. Premium features include advanced matching, priority support, and enhanced visibility. Check our Pricing page for detailed plans."
    },
    {
      question: "How does job matching work?",
      answer: "Our intelligent matching system connects SDPs with qualified practitioners based on skills, experience, location, and availability. SDPs can post projects, and practitioners can apply or be automatically matched based on their profiles."
    },
    {
      question: "What types of projects can I find on SkillLinker?",
      answer: "You can find various projects including skills assessments, moderation services, training program development, quality assurance, and consulting services across different industries and SETA requirements."
    },
    {
      question: "How secure is my data on SkillLinker?",
      answer: "We take data security seriously. All data is encrypted, and we comply with South African data protection regulations. We use industry-standard security measures to protect your personal and professional information."
    },
    {
      question: "Can SDPs post projects anonymously?",
      answer: "Yes, SDPs have the option to post projects anonymously initially. Once they decide to proceed with a practitioner, they can reveal their identity and contact information."
    },
    {
      question: "What if I need help with my account or platform features?",
      answer: "Our Help Center provides comprehensive guides and tutorials. For personalized assistance, you can contact our support team through the Contact page or use the in-app chat feature."
    },
    {
      question: "Are there any fees for practitioners?",
      answer: "Basic account creation and profile setup is free. We only charge a small commission on successful project completions to cover platform costs and ensure quality service."
    },
    {
      question: "How do I update my profile information?",
      answer: "You can update your profile anytime by logging into your account and navigating to the Profile section. Make sure to keep your information current to improve matching accuracy."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Find answers to common questions about SkillLinker. If you can't find what you're looking for, feel free to contact our support team.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-blue-500" />
                ) : (
                  <FaChevronDown className="text-blue-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white p-10 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="mb-6 text-lg">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition-colors">
              Visit Help Center
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Getting Started", "Account Management", "Project Posting", "Verification Process"].map((topic, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                <p className="font-semibold text-blue-600">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
