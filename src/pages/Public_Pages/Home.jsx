// src/pages/Public_Pages/Home.jsx
import React from "react";
import { FaUsers, FaBriefcase, FaCheckCircle } from "react-icons/fa";
import { Fade, Bounce } from "react-awesome-reveal";

// Static placeholder images
const heroImage = "https://via.placeholder.com/600x400?text=SkillLinker+Hero";
const featureImg1 = "https://via.placeholder.com/300x200?text=Job+Matching";
const featureImg2 = "https://via.placeholder.com/300x200?text=Verified+Practitioners";
const featureImg3 = "https://via.placeholder.com/300x200?text=Secure+Platform";




import heroImage from '../../assets/skillbuilder1.webp';
import featureImg1 from '../../assets/job1.webp';
import featureImg2 from '../../assets/qualityassurance skills.webp';
import featureImg3 from '../../assets/mining-technology.webp';




const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-24 px-6 md:px-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <Fade cascade>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Connect with Verified Practitioners & SDPs
              </h1>
              <p className="text-lg md:text-xl mb-8">
                SkillLinker is your centralized marketplace for Assessors, Moderators, and Skills Development Providers. Find opportunities, connect, and grow your professional network.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all">
                  Get Started
                </button>
                <button className="btn btn-outline btn-lg shadow hover:shadow-lg transition-all">
                  Learn More
                </button>
              </div>
            </Fade>
          </div>
          <div className="md:w-1/2">
            <img src={heroImage} alt="SkillLinker Hero" className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <Bounce>
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-10 shadow-md hover:shadow-xl transition-all">
              <FaUsers className="mx-auto text-5xl text-blue-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">500+ Practitioners</h3>
              <p className="text-gray-600">Verified Assessors & Moderators ready for your projects.</p>
            </div>
          </Bounce>
          <Bounce delay={200}>
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-10 shadow-md hover:shadow-xl transition-all">
              <FaBriefcase className="mx-auto text-5xl text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">100+ SDPs</h3>
              <p className="text-gray-600">Skills Development Providers posting exciting opportunities.</p>
            </div>
          </Bounce>
          <Bounce delay={400}>
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl p-10 shadow-md hover:shadow-xl transition-all">
              <FaCheckCircle className="mx-auto text-5xl text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Trusted Network</h3>
              <p className="text-gray-600">All practitioners verified for credibility and quality assurance.</p>
            </div>
          </Bounce>
        </div>
      </section>
{/* Hero Section */}
<img src={heroImage} alt="SkillLinker Hero" className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform" />

{/* Features Section */}
{[featureImg1, featureImg2, featureImg3].map((img, idx) => (
  <div key={idx} className="card bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform">
    <img src={img} alt="Feature" className="w-full h-40 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">
        {idx === 0 && "Easy Job Matching"}
        {idx === 1 && "Verified Practitioners"}
        {idx === 2 && "Secure & Scalable"}
      </h3>
      <p className="text-gray-600">
        {idx === 0 && "SDPs find qualified practitioners in minutes, while practitioners discover relevant opportunities."}
        {idx === 1 && "Manual or automated verification ensures you connect with trustworthy professionals."}
        {idx === 2 && "Built on modern web technologies, SkillLinker scales with your organization’s growth."}
      </p>
    </div>
  </div>
))}

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-20 px-6 md:px-20 text-center rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join the network?</h2>
        <p className="mb-6 text-lg md:text-xl">Create your account and start connecting with verified practitioners or SDPs today.</p>
        <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all">Sign Up Now</button>
      </section>

    </div>
  );
};

export default Home;
