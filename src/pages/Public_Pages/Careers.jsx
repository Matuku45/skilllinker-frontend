import React from "react";
import { FaMapMarkerAlt, FaClock, FaDollarSign } from "react-icons/fa";

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      location: "Johannesburg, South Africa",
      type: "Full-time",
      salary: "R50,000 - R70,000/month",
      description: "Join our team to build innovative web platforms for skills development. Experience with React, Node.js, and cloud technologies required."
    },
    {
      id: 2,
      title: "Skills Development Specialist",
      location: "Cape Town, South Africa",
      type: "Full-time",
      salary: "R40,000 - R55,000/month",
      description: "Work with SDPs and practitioners to enhance our platform's educational content and user experience."
    },
    {
      id: 3,
      title: "DevOps Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "R60,000 - R80,000/month",
      description: "Ensure our platform scales efficiently. Experience with AWS, Docker, and CI/CD pipelines essential."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          Careers at SkillLinker
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Join MetroSites and help revolutionize skills development in South Africa. We're looking for passionate individuals to build the future of professional training.
        </p>

        <div className="bg-white p-10 rounded-xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">Work on cutting-edge technology shaping the future of education.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p className="text-gray-600">Make a real difference in South Africa's skills development sector.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth</h3>
              <p className="text-gray-600">Continuous learning and career development opportunities.</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Current Openings</h2>
        <div className="space-y-6">
          {jobOpenings.map((job) => (
            <div key={job.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-4">{job.title}</h3>
              <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  {job.type}
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="mr-2" />
                  {job.salary}
                </div>
              </div>
              <p className="text-gray-700 mb-6">{job.description}</p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white p-10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Don't See the Perfect Role?</h2>
          <p className="mb-6 text-lg">We're always looking for talented individuals. Send us your resume and let's talk!</p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Send Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Careers;
