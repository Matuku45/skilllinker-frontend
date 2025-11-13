import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Skills Development Manager, TechCorp",
      image: "https://via.placeholder.com/100x100?text=SJ",
      rating: 5,
      text: "SkillLinker has revolutionized how we find qualified Assessors. The matching is spot-on and the platform is incredibly user-friendly. We've seen a 40% reduction in our hiring time.",
      date: "March 2024"
    },
    {
      name: "Dr. Michael Brown",
      role: "Certified Assessor & Moderator",
      image: "https://via.placeholder.com/100x100?text=MB",
      rating: 5,
      text: "As a freelance Moderator, SkillLinker has opened up so many opportunities. The verification process gives clients confidence in my work, and the platform is secure and professional.",
      date: "February 2024"
    },
    {
      name: "Thandi Nkosi",
      role: "HR Director, EduSkills SA",
      image: "https://via.placeholder.com/100x100?text=TN",
      rating: 5,
      text: "The quality of practitioners on SkillLinker is outstanding. Every professional we've worked with has been thoroughly vetted and highly skilled. It's become our go-to platform for all our assessment needs.",
      date: "January 2024"
    },
    {
      name: "James van der Merwe",
      role: "Training Coordinator, BuildSkills",
      image: "https://via.placeholder.com/100x100?text=JvdM",
      rating: 5,
      text: "SkillLinker's analytics and reporting features have given us incredible insights into our training programs. The platform scales beautifully as we've grown from 50 to 500 learners.",
      date: "December 2023"
    },
    {
      name: "Nomsa Dlamini",
      role: "Independent Assessor",
      image: "https://via.placeholder.com/100x100?text=ND",
      rating: 5,
      text: "The direct messaging and project tracking features make collaboration so much easier. I can manage multiple projects simultaneously without any confusion. Highly recommended!",
      date: "November 2023"
    },
    {
      name: "Andre Botha",
      role: "CEO, SkillDev Solutions",
      image: "https://via.placeholder.com/100x100?text=AB",
      rating: 5,
      text: "SkillLinker has transformed our business operations. The white-label solution allowed us to maintain our brand identity while leveraging their powerful matching technology.",
      date: "October 2023"
    }
  ];

  const stats = [
    { number: "500+", label: "Verified Practitioners" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "150+", label: "Partner Organizations" },
    { number: "50k+", label: "Successful Matches" }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          What Our Community Says
        </h1>
        <p className="text-lg text-gray-700 mb-16 text-center">
          Don't just take our word for it. Here's what Assessors, Moderators, and SDPs across South Africa have to say about SkillLinker.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm text-gray-500">{testimonial.date}</span>
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-blue-200 text-2xl mb-2" />
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-8 rounded-xl mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <FaQuoteLeft className="text-blue-200 text-4xl mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl font-light mb-6 italic">
              "SkillLinker doesn't just connect people—it builds careers and transforms industries. In a country where skills development is crucial for economic growth, platforms like this are game-changers."
            </blockquote>
            <div className="flex items-center justify-center">
              <img
                src="https://via.placeholder.com/80x80?text=LM"
                alt="Lerato Mthembu"
                className="w-16 h-16 rounded-full mr-4 border-4 border-white"
              />
              <div className="text-left">
                <div className="font-semibold text-lg">Lerato Mthembu</div>
                <div className="text-blue-100">Director General, Department of Higher Education and Training</div>
                <div className="flex items-center mt-2">
                  {renderStars(5)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Ready to experience the SkillLinker difference? Join thousands of satisfied users who trust our platform for their skills development needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Started Today
            </button>
            <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Read More Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
