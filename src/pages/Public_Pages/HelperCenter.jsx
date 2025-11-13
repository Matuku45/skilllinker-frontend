import React, { useState } from "react";
import { FaSearch, FaQuestionCircle, FaBook, FaVideo, FaComments, FaPhone, FaEnvelope } from "react-icons/fa";

const HelperCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: <FaQuestionCircle /> },
    { id: "getting-started", name: "Getting Started", icon: <FaBook /> },
    { id: "account", name: "Account & Profile", icon: <FaComments /> },
    { id: "verification", name: "Verification", icon: <FaVideo /> },
    { id: "matching", name: "Finding Opportunities", icon: <FaSearch /> },
    { id: "billing", name: "Billing & Payments", icon: <FaPhone /> }
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I create an account on SkillLinker?",
      answer: "To create an account, click the 'Register' button and select your user type (Assessor, Moderator, or SDP). Fill in your details, verify your email, and complete the verification process."
    },
    {
      id: 2,
      category: "verification",
      question: "What documents do I need for verification?",
      answer: "Assessors and Moderators need professional qualifications, ID documents, and proof of experience. SDPs require business registration and relevant licenses. Contact support for specific requirements."
    },
    {
      id: 3,
      category: "matching",
      question: "How does the matching system work?",
      answer: "Our AI-powered system matches practitioners with SDPs based on skills, experience, location, and project requirements. You can also search manually and save favorite profiles."
    },
    {
      id: 4,
      category: "account",
      question: "How do I update my profile information?",
      answer: "Go to your dashboard, click on 'Profile Settings', and update your information. Don't forget to save changes. Profile updates are reviewed for accuracy."
    },
    {
      id: 5,
      category: "billing",
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, debit cards, EFT, and bank transfers. Enterprise clients can arrange invoicing. All payments are processed securely through certified gateways."
    },
    {
      id: 6,
      category: "getting-started",
      question: "Is there a mobile app available?",
      answer: "Yes! Download our mobile app from the App Store or Google Play Store. It offers full functionality for managing your account and finding opportunities on the go."
    },
    {
      id: 7,
      category: "verification",
      question: "How long does verification take?",
      answer: "Basic verification usually takes 2-3 business days. Advanced verification for specialized roles may take up to 5 business days. You'll receive email updates throughout the process."
    },
    {
      id: 8,
      category: "matching",
      question: "Can I work with multiple SDPs at once?",
      answer: "Yes, practitioners can engage with multiple SDPs simultaneously, as long as project schedules don't conflict and all parties agree to the arrangements."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const contactOptions = [
    {
      icon: <FaComments className="text-blue-500 text-2xl" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 8AM-6PM SAST",
      action: "Start Chat"
    },
    {
      icon: <FaEnvelope className="text-green-500 text-2xl" />,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email"
    },
    {
      icon: <FaPhone className="text-yellow-500 text-2xl" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri, 9AM-5PM SAST",
      action: "Call Now"
    },
    {
      icon: <FaVideo className="text-purple-500 text-2xl" />,
      title: "Video Tutorials",
      description: "Learn at your own pace",
      availability: "Available 24/7",
      action: "Watch Videos"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-600">
          Help Center
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Find answers to common questions and get the help you need
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                {faq.question}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <FaQuestionCircle className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all categories
            </p>
          </div>
        )}

        {/* Popular Topics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <FaBook className="mx-auto text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Getting Started Guide</h3>
              <p className="text-gray-600 mb-4">Complete walkthrough for new users</p>
              <button className="text-blue-500 hover:text-blue-700 font-medium">
                Read Guide →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <FaVideo className="mx-auto text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Step-by-step video guides</p>
              <button className="text-blue-500 hover:text-blue-700 font-medium">
                Watch Videos →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <FaComments className="mx-auto text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Forum</h3>
              <p className="text-gray-600 mb-4">Connect with other users</p>
              <button className="text-blue-500 hover:text-blue-700 font-medium">
                Join Discussion →
              </button>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                <p className="text-gray-500 text-xs mb-4">{option.availability}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <FaPhone className="mx-auto text-2xl text-blue-500 mb-2" />
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600">+27 (0)21 123 4567</p>
              <p className="text-sm text-gray-500">Mon-Fri, 9AM-5PM SAST</p>
            </div>
            <div>
              <FaEnvelope className="mx-auto text-2xl text-green-500 mb-2" />
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">support@skilllinker.co.za</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </div>
            <div>
              <FaComments className="mx-auto text-2xl text-purple-500 mb-2" />
              <p className="font-semibold">Live Chat</p>
              <p className="text-gray-600">Available on website</p>
              <p className="text-sm text-gray-500">Mon-Fri, 8AM-6PM SAST</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelperCenter;
