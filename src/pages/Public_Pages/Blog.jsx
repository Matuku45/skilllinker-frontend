import React from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Skills Development in South Africa",
      excerpt: "Exploring how digital platforms like SkillLinker are transforming the professional training landscape.",
      author: "MetroSites Team",
      date: "2024-01-15",
      image: "https://via.placeholder.com/400x250?text=Skills+Development"
    },
    {
      id: 2,
      title: "Best Practices for Assessor-Moderator Collaboration",
      excerpt: "Tips and strategies for successful partnerships between Assessors, Moderators, and SDPs.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-10",
      image: "https://via.placeholder.com/400x250?text=Collaboration"
    },
    {
      id: 3,
      title: "Navigating Accreditation in the Digital Age",
      excerpt: "How technology is streamlining the accreditation process for skills development providers.",
      author: "Prof. Michael Brown",
      date: "2024-01-05",
      image: "https://via.placeholder.com/400x250?text=Accreditation"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          SkillLinker Blog
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Stay updated with the latest insights, trends, and best practices in skills development and professional training.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {post.date}
                  </div>
                </div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Get the latest updates and insights delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
