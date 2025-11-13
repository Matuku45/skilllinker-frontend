import React from "react";
import { FaSearch, FaHandshake, FaShieldAlt, FaChartLine, FaUsers, FaCog } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaSearch className="text-4xl text-blue-500" />,
      title: "Smart Matching",
      description: "Our AI-powered matching system connects SDPs with the most qualified Assessors and Moderators based on skills, experience, and project requirements."
    },
    {
      icon: <FaHandshake className="text-4xl text-green-500" />,
      title: "Seamless Collaboration",
      description: "Built-in communication tools, project management features, and secure document sharing to facilitate smooth partnerships."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-yellow-500" />,
      title: "Verification & Trust",
      description: "Rigorous verification process ensures all practitioners are qualified and trustworthy, building confidence in every connection."
    },
    {
      icon: <FaChartLine className="text-4xl text-purple-500" />,
      title: "Analytics & Insights",
      description: "Comprehensive dashboards and reporting tools to track performance, project progress, and business growth metrics."
    },
    {
      icon: <FaUsers className="text-4xl text-red-500" />,
      title: "Community Building",
      description: "Networking events, forums, and professional development opportunities to foster industry connections and knowledge sharing."
    },
    {
      icon: <FaCog className="text-4xl text-indigo-500" />,
      title: "Custom Solutions",
      description: "Tailored services for large organizations, including white-label solutions, API integrations, and custom workflow automation."
    }
  ];

  const features = [
    "Real-time notifications for new opportunities",
    "Mobile-responsive platform for on-the-go access",
    "Multi-language support (English, Afrikaans, Zulu)",
    "Integration with SETA systems and databases",
    "Automated invoicing and payment processing",
    "24/7 customer support and technical assistance"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          Our Services
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Discover how SkillLinker transforms the skills development landscape with innovative solutions designed for Assessors, Moderators, and SDPs.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How SkillLinker Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create & Verify</h3>
              <p className="text-gray-600">Practitioners create profiles and get verified. SDPs set up their organization accounts.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Match</h3>
              <p className="text-gray-600">Our platform matches qualified professionals with relevant opportunities automatically.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborate & Grow</h3>
              <p className="text-gray-600">Secure collaboration tools help teams work together efficiently and achieve successful outcomes.</p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                "SkillLinker has revolutionized how we find qualified Assessors. The matching is spot-on and the platform is incredibly user-friendly."
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Skills Development Manager, TechCorp</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4 italic">
                "As a freelance Moderator, SkillLinker has opened up so many opportunities. The verification process gives clients confidence in my work."
              </p>
              <div className="font-semibold">Dr. Michael Brown</div>
              <div className="text-sm text-gray-500">Certified Assessor & Moderator</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-blue-500 to-green-500 text-white p-10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience SkillLinker?</h2>
          <p className="mb-6 text-lg">
            Join thousands of professionals already using our platform to connect, collaborate, and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition-colors">
              Schedule Demo
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
