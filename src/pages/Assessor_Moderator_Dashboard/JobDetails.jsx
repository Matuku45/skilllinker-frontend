import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext"; // Assuming AuthContext is correctly structured
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimesCircle } from "react-icons/fa"; // Using react-icons

// --- ApplicationModal Component (Required for Apply button functionality) ---

const ApplicationModal = ({ job, onClose, onSubmit }) => {
    const [coverLetter, setCoverLetter] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!coverLetter.trim()) {
            setError("Cover letter is required.");
            return;
        }
        onSubmit(coverLetter);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-bold text-blue-600">Apply for: {job.title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
                        <FaTimesCircle className="w-6 h-6" />
                    </button>
                </div>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="coverLetter" className="block text-gray-700 font-medium mb-2">
                        Cover Letter
                    </label>
                    <textarea
                        id="coverLetter"
                        rows="6"
                        value={coverLetter}
                        onChange={(e) => { setCoverLetter(e.target.value); setError(null); }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Tell us why you are the perfect candidate..."
                    ></textarea>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- JobDetails Component (API Fetching Logic) ---

const JobDetails = () => {
    const { id: urlId } = useParams(); // ID from URL path (e.g., '/jobs/1')
    const navigate = useNavigate();
    const { currentUser, isAuthenticated } = useAuth(); // Get user and token

    // State for the job data
    const [job, setJob] = useState(null);
    // State for the ID typed into the input field
    const [jobIdInput, setJobIdInput] = useState(urlId || ''); 
    // State to trigger the actual fetch, derived from URL or input
    const [currentJobId, setCurrentJobId] = useState(urlId ? Number(urlId) : null); 
    
    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const API_BASE_URL = "http://localhost:3000/api";

    /**
     * Effect to fetch the job details from the API.
     * Runs whenever currentJobId changes.
     */
    useEffect(() => {
        const fetchJob = async () => {
            if (!currentJobId || isNaN(currentJobId)) {
                setJob(null);
                // Only show a specific error if we tried to load an invalid ID
                if (currentJobId) setError("Invalid Job ID provided."); 
                return;
            }

            if (!isAuthenticated || !currentUser?.token) {
                 setError("Authentication required to view job details.");
                 setLoading(false);
                 return;
            }

            setLoading(true);
            setError(null);
            setJob(null); // Clear job while loading new one

            try {
                // ✅ REAL API CALL: Fetch job data with Authorization header
                const res = await axios.get(`${API_BASE_URL}/jobs/${currentJobId}`, {
                    headers: { 
                        Authorization: `Bearer ${currentUser.token}` 
                    },
                });
                
                setJob(res.data);
            } catch (err) {
                console.error("Job Fetch Error:", err);
                const errorMessage = err.response?.data?.message || "Failed to fetch job.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (currentJobId) {
            fetchJob();
        }
    }, [currentJobId, currentUser?.token, isAuthenticated]); 

    /**
     * Handler for the manual ID input button.
     * Updates the currentJobId state, which triggers the useEffect.
     */
    const handleLoadJob = () => {
        setError(null);
        const newId = Number(jobIdInput);
        if (isNaN(newId) || newId <= 0) {
            setError("Please enter a valid numeric Job ID.");
            return;
        }
        // Update the source of truth, triggering the useEffect
        setCurrentJobId(newId);
    };

    /**
     * Handler to go back in browser history or navigate to the dashboard.
     */
    const handleBack = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/assessor/dashboard");
    };

    /**
     * Handler for the application submission.
     */
    const handleApplication = async (coverLetter) => {
        setError(null);
        if (!job || !currentUser || !currentUser.id) {
            setError("Cannot apply: User not fully authenticated or job not loaded.");
            return;
        }

        try {
            // ✅ REAL API CALL: Post application data with Authorization header
            await axios.post(
                `${API_BASE_URL}/applications`,
                { jobId: job.id, userId: currentUser.id, coverLetter },
                { 
                    headers: { 
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentUser.token}` 
                    } 
                }
            );
            
            alert(`Application for Job ID ${job.id} submitted successfully!`);
            setShowModal(false);
        } catch (err) {
            console.error("Application submission error:", err);
            const errorMessage = err.response?.data?.message || err.message;
            setError(`Application failed: ${errorMessage}`);
            setShowModal(false);
        }
    };


    // --- RENDER LOGIC ---

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
                <p className="p-6 text-gray-500 text-xl animate-pulse rounded-xl bg-white shadow">
                    Loading job details for ID {currentJobId}...
                </p>
            </div>
        );
    }
    
    const renderLoadInput = (currentId = null) => (
        <div className="flex space-x-2 mb-6 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <input
                type="number"
                value={jobIdInput}
                onChange={(e) => { setJobIdInput(e.target.value); setError(null); }}
                placeholder={currentId ? `Currently loaded ID: ${currentId}` : "Enter Job ID (e.g., 50)"}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                onClick={handleLoadJob}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition font-medium"
            >
                Load Job
            </button>
        </div>
    );

    // Initial state or explicit error when no job is present
    if (error || !job) { 
        return (
            <div className="min-h-screen p-6 bg-gray-50 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Job Details</h2>
                
                {error && (
                    <div className="p-4 rounded-lg mb-6 shadow-md font-medium bg-red-100 text-red-700">
                        <FaTimesCircle className="inline w-5 h-5 mr-2" />
                        **Error:** {error}
                    </div>
                )}
                
                <div className="text-center text-gray-500 mt-12 mb-6">
                    {error ? "Please correct the ID or authenticate." : "No job loaded. Please enter a Job ID."}
                </div>
                
                {renderLoadInput()}
            </div>
        );
    }
    
    // Main Content Render
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
            <div className="max-w-3xl mx-auto">
                {/* BACK BUTTON */}
                <button
                    onClick={handleBack}
                    className="mb-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                >
                    ← Back
                </button>

                {/* ID Input & Loader Section */}
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Load Another Job</h2>
                {renderLoadInput(job.id)}
                
                {/* Application Error Message Box (for submission failures) */}
                {error && (
                    <div className={`p-4 rounded-lg mb-6 shadow-md font-medium bg-red-100 text-red-700`}>
                        <FaTimesCircle className="inline w-5 h-5 mr-2" />
                        **Submission Error:** {error}
                    </div>
                )}
                
                {/* Job Card */}
                <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
                    <div className="flex justify-between items-start">
                        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                            {job.status}
                        </span>
                    </div>

                    <p className="mt-4 text-gray-700 text-lg leading-relaxed">{job.description}</p>

                    {/* Job Info */}
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center text-gray-600">
                            <FaBriefcase className="w-5 h-5 mr-2 text-blue-500" />
                            <span>**Company:** {job.sdpName || "N/A"}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="w-5 h-5 mr-2 text-red-500" />
                            <span>**Location:** {job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaCalendarAlt className="w-5 h-5 mr-2 text-purple-500" />
                            <span>
                                **Deadline:** <strong>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}</strong>
                            </span>
                        </div>
                    </div>

                    {/* Qualifications */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Qualifications:</h3>
                        <ul className="space-y-2">
                            {job.requiredQualifications?.map((qual, index) => (
                                <li
                                    key={index}
                                    className="flex items-center bg-gray-100 p-2 rounded-lg text-gray-700"
                                >
                                    <FaCheck className="w-4 h-4 mr-2 text-green-600" /> {qual}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg text-lg font-medium hover:bg-blue-700 transition"
                        disabled={job.status !== 'open' || !isAuthenticated}
                    >
                        {isAuthenticated ? `Apply for this Job (ID: ${job.id})` : "Login to Apply"}
                    </button>
                    {!isAuthenticated && (
                        <p className="text-center text-red-500 text-sm mt-2">You must be logged in to apply.</p>
                    )}
                </div>

                {/* Application Modal */}
                {showModal && job && (
                    <ApplicationModal
                        job={job}
                        onClose={() => setShowModal(false)}
                        onSubmit={(coverLetter) => handleApplication(coverLetter)}
                    />
                )}
            </div>
        </div>
    );
};

export default JobDetails;