import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAssessor } from "../../contexts/AssessorContext";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaUser } from "react-icons/fa";
import Profile from "./Profile";

const ModeratorAssessorDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { jobs, loadingJobs, applyToJob } = useAssessor();
  const [activeTab, setActiveTab] = useState("profile");
  const [applyingJobId, setApplyingJobId] = useState(null);

  if (!currentUser) {
    return <div className="text-center py-12 text-gray-500">Loading user...</div>;
  }

  const handleApply = async (jobId) => {
    if (!currentUser?.verified) {
      alert("Please verify your account to apply.");
      return;
    }

    setApplyingJobId(jobId);
    try {
      await applyToJob(jobId, "I am interested in this job.");
      alert("Applied successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply.");
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-4 sticky top-0 h-screen overflow-y-auto z-20">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaBriefcase className="mr-2" /> Jobs
        </h2>
        {loadingJobs ? (
          <div className="text-gray-500">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="text-gray-400">No jobs found</div>
        ) : (
          <ul className="space-y-2">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="p-2 border rounded hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              >
                <span>{job.title}</span>
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
      <main className="flex-1 relative">
        {/* Sticky Header + Tabs */}
        <div className="sticky top-0 z-30 bg-gray-50 shadow-sm">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
              SkillLinker Dashboard
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
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
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4 md:px-6 py-2 bg-gray-50">
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
                  {tab === "profile" ? (
                    <span className="flex items-center">
                      <FaUser className="mr-1" /> Profile
                    </span>
                  ) : (
                    "All Jobs"
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
          {activeTab === "profile" && <Profile />}

          {activeTab === "jobs" && (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                    className="overflow-hidden shadow-lg rounded-lg bg-white transition-transform hover:scale-105"
                  >
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
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

                        <div className="mt-4 space-y-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <FaBriefcase className="mr-2" />
                            {job.sdpId}
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2" />
                            Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
                          </div>
                        </div>

                        {job.requiredQualifications && job.requiredQualifications.length > 0 && (
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
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          {job.budget ? `R${parseFloat(job.budget).toLocaleString()}` : "N/A"}
                        </span>
                        <button
                          disabled={applyingJobId === job.id || !currentUser.verified}
                          onClick={() => handleApply(job.id)}
                          className={`px-3 py-1 rounded text-white text-sm font-medium transition-colors ${
                            currentUser.verified
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {applyingJobId === job.id ? "Applying..." : "Apply"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModeratorAssessorDashboard;
