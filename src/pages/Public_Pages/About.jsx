import React from "react";
import { FaUsers, FaShieldAlt, FaRocket, FaHandshake, FaAward, FaGlobe } from "react-icons/fa";

const About = () => {
  const stats = [
    { number: "500+", label: "Verified Practitioners" },
    { number: "200+", label: "Partner SDPs" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-blue-500 text-3xl" />,
      title: "Trust & Integrity",
      description: "We maintain the highest standards of verification and transparency in all our operations."
    },
    {
      icon: <FaRocket className="text-green-500 text-3xl" />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize skills development connections."
    },
    {
      icon: <FaHandshake className="text-purple-500 text-3xl" />,
      title: "Collaboration",
      description: "Building strong partnerships between practitioners and organizations for mutual growth."
    },
    {
      icon: <FaAward className="text-yellow-500 text-3xl" />,
      title: "Excellence",
      description: "Committed to delivering exceptional service and fostering professional excellence."
    }
  ];

  const team = [
    {
      name: "Dr. Thabo Mthembu",
      role: "CEO & Founder",
      bio: "Former SETA executive with 15+ years in skills development.",
      image: "https://via.placeholder.com/150x150?text=Thabo"
    },
    {
      name: "Nomsa Zulu",
      role: "CTO",
      bio: "Tech innovator specializing in EdTech and professional networking platforms.",
      image: "https://via.placeholder.com/150x150?text=Nomsa"
    },
    {
      name: "James van der Merwe",
      role: "Head of Partnerships",
      bio: "Expert in B2B relationships with extensive experience in the skills sector.",
      image: "https://via.placeholder.com/150x150?text=James"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About SkillLinker
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Revolutionizing South Africa's skills development ecosystem through innovative technology and trusted connections.
          </p>
          <div className="flex justify-center">
            <FaGlobe className="text-6xl opacity-20" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To create a transparent, efficient, and trustworthy platform that connects qualified Assessors and Moderators with Skills Development Providers, fostering growth and excellence in South Africa's professional training sector.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that by streamlining the connection process and ensuring quality verification, we can accelerate skills development and contribute to economic growth across the nation.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                What Drives Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Bridging the skills gap in South Africa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Ensuring quality and credibility in assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Empowering professionals and organizations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Promoting transparency and accountability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Our Story
          </h2>
          <div className="text-left space-y-6 text-gray-700 leading-relaxed">
            <p>
              SkillLinker was born from a simple observation: South Africa's skills development sector, while crucial for economic growth, was hindered by inefficient connection processes between qualified practitioners and organizations seeking their services.
            </p>
            <p>
              Our founders, with decades of combined experience in education, technology, and skills development, recognized that the traditional methods of finding and verifying Assessors and Moderators were time-consuming, unreliable, and often opaque.
            </p>
            <p>
              In 2023, we launched SkillLinker as a solution to these challenges. By combining rigorous verification processes with intuitive technology, we've created a platform that not only connects the right people but also ensures accountability and quality in every interaction.
            </p>
            <p>
              Today, SkillLinker serves hundreds of practitioners and organizations across South Africa, contributing to a more skilled and competitive workforce. We're proud to play our part in building a brighter future for our nation.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-6 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Be part of the movement that's transforming South Africa's skills development landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
