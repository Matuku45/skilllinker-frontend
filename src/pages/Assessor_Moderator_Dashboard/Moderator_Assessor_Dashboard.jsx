import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAssessor } from "../../contexts/AssessorContext";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheck } from "react-icons/fa";
import Profile from "./Profile";

const ModeratorAssessorDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { jobs, loadingJobs, fetchJobs: fetchJobsFromContext } = useAssessor();
  const [activeTab, setActiveTab] = useState("profile");

  // Wrap fetchJobs in useCallback to avoid infinite loops
  const fetchJobs = useCallback(() => {
    fetchJobsFromContext();
  }, [fetchJobsFromContext]);

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, [currentUser?.token, fetchJobs]);

  if (!currentUser) {
    return <div className="text-center py-12">Loading user...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with Jobs */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Jobs</h2>
        {loadingJobs ? (
          <div className="text-gray-500">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="text-gray-400">No jobs found</div>
        ) : (
          <ul className="space-y-2">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
              >
                {job.title}{" "}
                <span
                  className={`px-2 py-0.5 text-xs rounded ${
                    job.status === "open"
                      ? "bg-green-100 text-green-800"
                      : job.status === "in-progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {job.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">SkillLinker Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, {currentUser.firstName} {currentUser.lastName}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                currentUser.verified
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {currentUser.verified ? "Verified" : "Pending Verification"}
            </span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {["profile", "jobs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab === "profile" ? "Profile" : "All Jobs"}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && <Profile />}

        {activeTab === "jobs" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loadingJobs ? (
              <div className="text-center py-12 col-span-full text-gray-500">
                Loading...
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 col-span-full text-gray-400">
                No jobs found
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="overflow-hidden shadow rounded-lg bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          job.status === "open"
                            ? "bg-green-100 text-green-800"
                            : job.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">{job.description}</p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaBriefcase className="mr-2" />
                        {job.sdpName}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        Required Qualifications:
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requiredQualifications.map((qual, index) => (
                          <li key={index} className="flex items-center">
                            <FaCheck className="mr-2 text-green-500" />
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">
                        R{job.budget.toLocaleString()}
                      </span>
                    </div>

                    {!currentUser?.verified && (
                      <div className="mt-4 text-sm text-yellow-700">
                        Verify your account to apply for this job
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ModeratorAssessorDashboard;
