import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "https://skilllinker-frontend.onrender.com/api";

const ApplicationsList = () => {
  const { token, currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter by logged-in user
      const filtered = res.data.filter(
        (app) => app.userId === currentUser.id
      );

      // 🔥 FETCH JOB DETAILS FOR EACH APPLICATION
      const updatedWithJobs = await Promise.all(
        filtered.map(async (app) => {
          try {
            const jobRes = await axios.get(`${API_URL}/jobs/${app.jobId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            return {
              ...app,
              job: jobRes.data, // full job object
            };
          } catch {
            return { ...app, job: null };
          }
        })
      );

      setApplications(updatedWithJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="px-5 py-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Incoming Applications ({applications.length})
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 border border-gray-200"
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {app.job?.title || "Unknown Job"}
                </h3>
                <p className="text-sm text-gray-500">
                  {app.job?.company || "Unknown Company"}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  app.status === "NEW"
                    ? "bg-green-100 text-green-700"
                    : app.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {app.status}
              </span>
            </div>

            {/* JOB INFO */}
            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p>
                <strong>Salary:</strong>{" "}
                {app.job?.salary || "Not Specified"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {app.job?.location || "Remote"}
              </p>
              <p>
                <strong>Applied:</strong>{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Snippet */}
            <p className="text-gray-700 text-sm mb-4 leading-6">
              "
              {app.coverLetter?.slice(0, 120) ||
                app.message?.slice(0, 120) ||
                "No message provided"}
              ..."
            </p>

            {/* Review Button */}
            <button
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              onClick={() => alert(`Open review page for ${app._id}`)}
            >
              Review Application
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsList;
