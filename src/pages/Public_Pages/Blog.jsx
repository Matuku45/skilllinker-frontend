import React, { useState } from "react";
import { FaCalendar, FaUser, FaTag, FaSearch, FaArrowRight } from "react-icons/fa";


import buildingNetwork from "../../assets/building-network-online.webp";
import job1 from "../../assets/job1.webp";
import job2 from "../../assets/job2.webp";
import miningTech from "../../assets/mining-technology.webp";

import reactLogo from "../../assets/react.svg";
import skillbuilder from "../../assets/skillbuilder1.webp";
import skillsForDigital from "../../assets/skillsfordigital.webp";
import southAfrica from "../../assets/southafrica.webp";
import training from "../../assets/training.webp";
import workshop3 from "../../assets/wokshop3.webp";
import workshop from "../../assets/workshop.webp";
import workshop2 from "../../assets/workshop2.webp";


const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "skills-development", name: "Skills Development" },
    { id: "industry-insights", name: "Industry Insights" },
    { id: "best-practices", name: "Best Practices" },
    { id: "case-studies", name: "Case Studies" }
  ];

const blogPosts = [
  {
    id: 1,
    title: "The Future of Skills Development in South Africa",
    excerpt:
      "Exploring emerging trends and technologies shaping the skills development landscape in South Africa and how practitioners can prepare for the future.",
    author: "Dr. Thabo Mthembu",
    date: "2024-11-15",
    category: "skills-development",
    readTime: "5 min read",
    image: southAfrica,
    tags: ["Skills Development", "Future Trends", "South Africa"]
  },
  {
    id: 2,
    title: "Building Trust in Online Professional Networks",
    excerpt:
      "How verification processes and transparent communication are revolutionizing professional networking in the skills development sector.",
    author: "Nomsa Zulu",
    date: "2024-11-10",
    category: "industry-insights",
    readTime: "4 min read",
    image: buildingNetwork,
    tags: ["Professional Networking", "Trust", "Verification"]
  },
  {
    id: 3,
    title: "Assessment Best Practices for Modern Learning",
    excerpt:
      "A comprehensive guide to implementing effective assessment strategies that align with contemporary learning methodologies and industry standards.",
    author: "Prof. James van der Merwe",
    date: "2024-11-05",
    category: "best-practices",
    readTime: "7 min read",
    image: job1,
    tags: ["Assessment", "Best Practices", "Learning"]
  },
  {
    id: 4,
    title: "Success Story: Transforming a Mining Company's Training Program",
    excerpt:
      "How a leading mining company improved their skills development outcomes by 40% through strategic partnerships and modern assessment methods.",
    author: "SkillLinker Team",
    date: "2024-10-28",
    category: "case-studies",
    readTime: "6 min read",
    image: miningTech,
    tags: ["Case Study", "Mining", "Training"]
  },
  {
    id: 5,
    title: "Digital Transformation in Skills Assessment",
    excerpt:
      "The role of technology in modernizing assessment processes and ensuring fair, efficient evaluation of learner competencies.",
    author: "Dr. Thabo Mthembu",
    date: "2024-10-20",
    category: "industry-insights",
    readTime: "5 min read",
    image: skillsForDigital,
    tags: ["Digital Transformation", "Assessment", "Technology"]
  }

];


  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-600">
          SkillLinker Blog
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Insights, trends, and expertise from the skills development community
        </p>

        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Featured Article</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaCalendar className="mr-2" />
                  {new Date(featuredPost.date).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  <FaUser className="mr-2" />
                  {featuredPost.author}
                  <span className="mx-2">•</span>
                  {featuredPost.readTime}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
                  Read Full Article
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>addd
        </section>

        {/* Blog Posts Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Latest Articles</h2>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaCalendar className="mr-2" />
                      {new Date(post.date).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      {post.readTime}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        Read More
                        <FaArrowRight className="ml-1 text-sm" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaSearch className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all categories
              </p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-6">
            Subscribe to our newsletter for the latest insights and trends in skills development
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
