import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAssessor } from "../../contexts/AssessorContext";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
  FaUser,
} from "react-icons/fa";
import Profile from "./Profile";

/* ---------------------------------------------------------
   APPLICATION MODAL COMPONENT
--------------------------------------------------------- */
const ApplicationModal = ({ job, user, onClose, onSubmit }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(
    "I am interested in this job."
  );

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!resume) {
      return alert("Please upload your resume.");
    }
    onSubmit({ resume, coverLetter });
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-xl">
        <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>

        <div className="space-y-3">
          {/* NAME */}
          <div>
            <label className="font-semibold">Full Name:</label>
            <input
              disabled
              className="w-full border p-2 rounded bg-gray-200"
              value={`${user.firstName} ${user.lastName}`}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-semibold">Email:</label>
            <input
              disabled
              className="w-full border p-2 rounded bg-gray-200"
              value={user.email}
            />
          </div>

          {/* RESUME UPLOAD */}
          <div>
            <label className="font-semibold">Upload Resume:</label>
            <input type="file" onChange={handleFileChange} className="w-full" />
          </div>

          {/* COVER LETTER */}
          <div>
            <label className="font-semibold">Cover Letter:</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------
   MAIN DASHBOARD PAGE
--------------------------------------------------------- */
const ModeratorAssessorDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { jobs, loadingJobs, applyToJob } = useAssessor();

  const [activeTab, setActiveTab] = useState("profile");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJobId, setApplyingJobId] = useState(null);

  if (!currentUser) {
    return (
      <div className="text-center py-12 text-gray-500">Loading user...</div>
    );
  }

  /* ---------------------------
      OPEN APPLICATION MODAL
  --------------------------- */
  const openApplyModal = (job) => {
    if (!currentUser?.verified) {
      alert("Please verify your account to apply.");
      return;
    }
    setSelectedJob(job);
  };

  /* ---------------------------
      SUBMIT APPLICATION
  --------------------------- */
  const handleApplicationSubmit = async ({ resume, coverLetter }) => {
    setApplyingJobId(selectedJob.id);

    const formData = new FormData();
    formData.append("jobId", selectedJob.id);
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {
      await applyToJob(selectedJob.id, formData);
      alert("Application submitted successfully!");
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
      alert("Failed to apply.");
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* --------------------- SIDEBAR ----------------------- */}
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

      {/* --------------------- MAIN CONTENT ----------------------- */}
      <main className="flex-1 relative">
        {/* HEADER */}
        <div className="sticky top-0 z-30 bg-gray-50 shadow-sm">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">SkillLinker Dashboard</h1>

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
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          </header>

          {/* TABS */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4 py-2 bg-gray-50">
              {["profile", "jobs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
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

        {/* CONTENT */}
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
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
                    className="shadow-lg rounded-lg bg-white overflow-hidden hover:scale-105 transition-transform"
                  >
                    <div className="p-6 flex flex-col justify-between h-full">
                      {/* JOB DETAILS */}
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
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

                        <p className="mt-2 text-sm text-gray-600">
                          {job.description}
                        </p>

                        <div className="mt-4 text-sm space-y-1 text-gray-500">
                          <div className="flex items-center">
                            <FaBriefcase className="mr-2" /> {job.sdpId}
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> {job.location}
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2" /> Deadline:{" "}
                            {job.deadline
                              ? new Date(job.deadline).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </div>

                        {job.requiredQualifications?.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 text-sm">
                              Required Qualifications:
                            </h4>
                            <ul className="mt-1 text-sm text-gray-700 space-y-1">
                              {job.requiredQualifications.map((qual, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center text-gray-700"
                                >
                                  <FaCheck className="mr-2 text-green-500" />
                                  {qual}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* APPLY BUTTON */}
                      <div className="mt-6 flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">
                          {job.budget
                            ? `R${parseFloat(job.budget).toLocaleString()}`
                            : "N/A"}
                        </span>

                        <button
                          disabled={applyingJobId === job.id}
                          onClick={() => openApplyModal(job)}
                          className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          {applyingJobId === job.id ? "Submitting..." : "Apply"}
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

      {/* APPLICATION MODAL */}
      {selectedJob && (
        <ApplicationModal
          job={selectedJob}
          user={currentUser}
          onClose={() => setSelectedJob(null)}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );
};

export default ModeratorAssessorDashboard;
