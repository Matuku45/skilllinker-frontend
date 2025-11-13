import React, { useState } from "react";
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaGraduationCap, FaUsers, FaRocket } from "react-icons/fa";

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "engineering", name: "Engineering" },
    { id: "product", name: "Product" },
    { id: "operations", name: "Operations" },
    { id: "marketing", name: "Marketing" },
    { id: "hr", name: "Human Resources" }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      department: "engineering",
      location: "Cape Town, South Africa",
      type: "Full-time",
      experience: "3-5 years",
      description: "We're looking for a passionate full-stack developer to join our engineering team and help build the next generation of skills development technology.",
      requirements: [
        "3+ years of experience with React and Node.js",
        "Experience with modern web technologies",
        "Knowledge of cloud platforms (AWS/Azure)",
        "Strong problem-solving skills",
        "Experience with agile development"
      ],
      benefits: [
        "Competitive salary and equity package",
        "Flexible working hours",
        "Professional development budget",
        "Health and wellness benefits",
        "Remote work options"
      ]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "product",
      location: "Johannesburg, South Africa",
      type: "Full-time",
      experience: "4-6 years",
      description: "Lead product strategy and development for our platform, working closely with engineering, design, and stakeholders to deliver exceptional user experiences.",
      requirements: [
        "4+ years of product management experience",
        "Experience in EdTech or professional services",
        "Strong analytical and data-driven mindset",
        "Excellent communication and leadership skills",
        "Understanding of agile methodologies"
      ],
      benefits: [
        "Competitive compensation package",
        "Professional development opportunities",
        "Flexible work arrangements",
        "Health and wellness programs",
        "Stock options"
      ]
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description: "Design, implement, and maintain our cloud infrastructure and CI/CD pipelines to ensure reliable, scalable, and secure platform operations.",
      requirements: [
        "3+ years of DevOps or SRE experience",
        "Strong experience with AWS or Azure",
        "Proficiency in Infrastructure as Code",
        "Experience with containerization (Docker/Kubernetes)",
        "Knowledge of monitoring and logging tools"
      ],
      benefits: [
        "Competitive salary and benefits",
        "100% remote work",
        "Learning and development budget",
        "Flexible hours",
        "Modern tech stack"
      ]
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "operations",
      location: "Cape Town, South Africa",
      type: "Full-time",
      experience: "2-4 years",
      description: "Support our clients in maximizing the value from SkillLinker, ensuring their success and satisfaction with our platform and services.",
      requirements: [
        "2+ years in customer success or account management",
        "Experience in SaaS or EdTech preferred",
        "Strong communication and interpersonal skills",
        "Data-driven approach to customer success",
        "Problem-solving and analytical abilities"
      ],
      benefits: [
        "Competitive base salary + commission",
        "Professional development support",
        "Flexible working environment",
        "Health benefits",
        "Career growth opportunities"
      ]
    },
    {
      id: 5,
      title: "UX/UI Designer",
      department: "product",
      location: "Cape Town, South Africa",
      type: "Full-time",
      experience: "2-4 years",
      description: "Create intuitive and beautiful user experiences for our platform, working closely with product and engineering teams to deliver user-centered designs.",
      requirements: [
        "2+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or Adobe Creative Suite",
        "Strong portfolio demonstrating design process",
        "Understanding of user research and usability testing",
        "Experience with design systems"
      ],
      benefits: [
        "Competitive salary and benefits",
        "Creative and collaborative environment",
        "Professional development budget",
        "Flexible work arrangements",
        "Modern design tools and resources"
      ]
    },
    {
      id: 6,
      title: "Talent Acquisition Specialist",
      department: "hr",
      location: "Johannesburg, South Africa",
      type: "Full-time",
      experience: "3-5 years",
      description: "Drive our recruitment efforts to attract top talent in the skills development and technology sectors across South Africa.",
      requirements: [
        "3+ years in recruitment or talent acquisition",
        "Experience in tech or education sectors",
        "Strong network in South African tech community",
        "Excellent communication and negotiation skills",
        "Understanding of employment law and best practices"
      ],
      benefits: [
        "Competitive salary and incentives",
        "Professional development opportunities",
        "Flexible work environment",
        "Health and wellness benefits",
        "Opportunity to shape company culture"
      ]
    }
  ];

  const filteredJobs = selectedDepartment === "all"
    ? jobOpenings
    : jobOpenings.filter(job => job.department === selectedDepartment);

  const perks = [
    {
      icon: <FaRocket className="text-blue-500 text-2xl" />,
      title: "Innovation First",
      description: "Work on cutting-edge technology solving real problems in skills development"
    },
    {
      icon: <FaUsers className="text-green-500 text-2xl" />,
      title: "Collaborative Culture",
      description: "Join a diverse team of passionate professionals committed to making a difference"
    },
    {
      icon: <FaGraduationCap className="text-purple-500 text-2xl" />,
      title: "Continuous Learning",
      description: "Access to professional development, conferences, and skill-building opportunities"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-600">
          Join Our Team
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Help us build the future of skills development in South Africa
        </p>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg p-8 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Shape the Future of Skills Development</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            At SkillLinker, we're not just building a platform – we're creating opportunities for professionals and organizations to thrive in South Africa's growing skills development sector.
          </p>
          <div className="flex justify-center">
            <FaBriefcase className="text-6xl opacity-20" />
          </div>
        </section>

        {/* Perks Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join SkillLinker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {perk.title}
                </h3>
                <p className="text-gray-700">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Openings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDepartment === dept.id
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <span className="flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <FaBriefcase className="mr-1" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>

                <p className="text-gray-700 mb-6">
                  {job.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700 text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Benefits:</h4>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <FaBriefcase className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No positions available
              </h3>
              <p className="text-gray-500">
                Check back later or select a different department
              </p>
            </div>
          )}
        </section>

        {/* Culture Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Our Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">What We Value</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                    <span><strong>Innovation:</strong> We encourage creative thinking and bold ideas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                    <span><strong>Collaboration:</strong> We believe in the power of teamwork and diverse perspectives</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                    <span><strong>Impact:</strong> We measure success by the positive change we create</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                    <span><strong>Growth:</strong> We invest in our people and their professional development</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Our Commitment</h3>
                <p className="text-gray-700 mb-4">
                  We're committed to creating an inclusive workplace where everyone feels valued and empowered to contribute their best work. We believe that diverse teams build better solutions, and we're dedicated to fostering an environment where different voices are heard and respected.
                </p>
                <p className="text-gray-700">
                  Join us in building technology that transforms South Africa's skills development landscape and creates opportunities for professionals and organizations across the nation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl mb-6">
            Don't see a position that matches your skills? Send us your resume anyway!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View All Openings
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Send Resume
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;
