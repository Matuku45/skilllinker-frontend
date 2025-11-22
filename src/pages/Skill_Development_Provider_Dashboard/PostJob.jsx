import React, { useState } from "react"; 
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { 
    FaArrowLeft, 
    FaPaperPlane, 
    FaClipboardList, 
    FaMapMarkerAlt, 
    FaMoneyBillAlt, 
    FaGraduationCap, 
    FaCalendarCheck,
    FaExclamationCircle, 
    FaCheckCircle 
} from "react-icons/fa"; 

// --- Component Start ---
const PostJob = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    // State to hold form data and validation/action messages
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        budget: "",
        requiredQualifications: "", // Expects comma-separated values
        deadline: ""
    });
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error/success messages when the user starts typing again
        if (error) setError(null);
        if (successMessage) setSuccessMessage(null);
    };

    /**
     * Client-side validation function
     */
    const validateForm = () => {
        const { title, description, location, budget, requiredQualifications, deadline } = formData;
        
        if (!title || !description || !location || !budget || !requiredQualifications || !deadline) {
            setError("All fields are required. Please fill out the entire form.");
            return false;
        }

        if (isNaN(Number(budget)) || Number(budget) <= 0) {
            setError("The Budget must be a positive number.");
            return false;
        }

        const qualificationsArray = requiredQualifications.split(',').map(q => q.trim()).filter(q => q.length > 0);
        if (qualificationsArray.length === 0) {
            setError("Please list at least one required qualification.");
            return false;
        }

        const deadlineDate = new Date(deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (deadlineDate <= today) {
            setError("The deadline must be a future date.");
            return false;
        }

        setError(null); 
        return true;
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?.token) {
        alert("You must be logged in to post a job.");
        return;
    }

    if (!validateForm()) {
        return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null); 

    const jobPayload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        budget: Number(formData.budget), 
        deadline: formData.deadline,
        sdpId: currentUser.id, 
        requiredQualifications: formData.requiredQualifications
            .split(",")
            .map(q => q.trim())
            .filter(q => q.length > 0)
    };

    try {
        // 1️⃣ Post the job
        const jobResponse = await axios.post(
            "http://localhost:3000/api/jobs",
            jobPayload,
            {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const postedJobId = jobResponse.data.id || Math.floor(Math.random() * 1000) + 100; 
        const broadcastMessages = [];
        const timestamp = new Date().toISOString();
        const fromUserId = currentUser.id;

        // Professional broadcast message
        const content = `📢 A new job has been posted: "${formData.title}". 
We are looking for qualified candidates to apply. 
Location: ${formData.location}, Budget: ZAR ${formData.budget}. 
Deadline: ${formData.deadline}. 
Check the dashboard for more details and submit your application promptly.`;

        // Loop for users 1–200, skip the poster
        for (let toUserId = 1; toUserId <= 200; toUserId++) {
            if (toUserId === fromUserId) continue;

            broadcastMessages.push({
                timestamp,
                read: false,
                id: 1, // simulated ID
                fromUserId,
                toUserId,
                jobId: postedJobId,
                content
            });
        }

        console.log(`✅ Job ID ${postedJobId} posted successfully. Broadcast simulated for ${broadcastMessages.length} users.`);
        
        setSuccessMessage(`Job posted successfully! Broadcast simulated for ${broadcastMessages.length} users. Navigating in 3s...`);

        // Delay navigation for 3 seconds
        setTimeout(() => {
            navigate("/sdp/dashboard", { replace: true });
        }, 3000); 

    } catch (serverError) {
        console.error("Error creating job:", serverError.response || serverError);
        setError(serverError.response?.data?.message || "Job posting failed. Check your network or permissions.");
    } finally {
        setIsSubmitting(false); 
    }
};


    return (
        <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/sdp/dashboard")}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition mb-6"
                >
                    <FaArrowLeft className="mr-2" /> Back to Dashboard
                </button>

                <h2 className="text-3xl font-bold mb-6 text-gray-800">Create a New Job 📝</h2>
                
                {/* --- Error Display Section --- */}
                {error && (
                    <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg flex items-center" role="alert">
                        <FaExclamationCircle className="mr-3 flex-shrink-0" />
                        <span className="font-medium">{error}</span>
                    </div>
                )}
                {/* --- Success Display Section --- */}
                {successMessage && (
                    <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg flex items-center" role="alert">
                        <FaCheckCircle className="mr-3 flex-shrink-0" />
                        <span className="font-medium">{successMessage}</span>
                    </div>
                )}
                {/* ----------------------------- */}

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="font-bold text-gray-700 flex items-center mb-1">
                            <FaClipboardList className="mr-2 text-blue-500" /> Job Title
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-bold text-gray-700 flex items-center mb-1">
                            <FaClipboardList className="mr-2 text-blue-500" /> Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="font-bold text-gray-700 flex items-center mb-1">
                            <FaMapMarkerAlt className="mr-2 text-green-500" /> Location
                        </label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-bold text-gray-700 flex items-center mb-1">
                            <FaMoneyBillAlt className="mr-2 text-yellow-500" /> Budget (ZAR)
                        </label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                            min="1" 
                            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-bold text-gray-700 flex items-center mb-1">
                            <FaGraduationCap className="mr-2 text-purple-500" /> Required Qualifications 
                            <span className="text-sm ml-2 text-gray-500 font-normal">(e.g., Degree, 3+ years experience, Python)</span>
                        </label>
                        <input
                            name="requiredQualifications"
                            value={formData.requiredQualifications}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-bold text-gray-700 flex items-center mb-1">
                            <FaCalendarCheck className="mr-2 text-red-500" /> Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || successMessage} 
                        className={`w-full p-3 text-white font-bold rounded transition duration-200 ${
                            isSubmitting || successMessage
                                ? 'bg-green-400 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700'
                        }`}                    
                    >
                        <FaPaperPlane className="inline mr-2" />
                        {isSubmitting ? 'Publishing...' : 'Publish Job'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default PostJob;