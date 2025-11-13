import React from "react";
import { FaUsers, FaHandshake, FaShieldAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          About SkillLinker
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          SkillLinker is a pioneering web-based platform developed by MetroSites to revolutionize the professional training and accreditation ecosystem in South Africa. We connect verified Assessors, Moderators, and Skills Development Providers (SDPs) in a secure, efficient digital marketplace.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaUsers className="mx-auto text-4xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To simplify verification, communication, and collaboration between practitioners and SDPs, fostering transparency and credibility in skills development.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaHandshake className="mx-auto text-4xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading digital hub for professional training in South Africa, empowering growth and innovation in the sector.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaShieldAlt className="mx-auto text-4xl text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
            <p className="text-gray-600">
              Integrity, innovation, and inclusivity drive everything we do, ensuring a trusted network for all stakeholders.
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <h4 className="text-xl font-semibold">Verification</h4>
                <p className="text-gray-600">Practitioners undergo rigorous verification to ensure credibility.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <h4 className="text-xl font-semibold">Connection</h4>
                <p className="text-gray-600">SDPs post opportunities, and practitioners apply seamlessly.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</div>
              <div>
                <h4 className="text-xl font-semibold">Collaboration</h4>
                <p className="text-gray-600">Secure communication and project management tools facilitate successful partnerships.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
