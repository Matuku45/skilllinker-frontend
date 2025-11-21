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
    FaCalendarCheck 
} from "react-icons/fa"; 

const PostJob = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        budget: "",
        requiredQualifications: "",
        deadline: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobPayload = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            budget: Number(formData.budget),
            deadline: formData.deadline,
            sdpId: currentUser.id,
            requiredQualifications: formData.requiredQualifications
                .split(",")
                .map((q) => q.trim())
        };

        try {
            await axios.post(
                "http://localhost:3000/api/jobs",
                jobPayload,
                { headers: { Authorization: `Bearer ${currentUser.token}` } }
            );

            navigate("/sdp/dashboard"); // Redirect after creation
        } catch (error) {
            console.error("Error creating job:", error);
            alert("Job posting failed. Check console.");
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/sdp/dashboard")}
                    className="flex items-center text-gray-700 mb-6"
                >
                    <FaArrowLeft className="mr-2" /> Back to Dashboard
                </button>

                <h2 className="text-3xl font-bold mb-6">Create a New Job</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="font-bold text-gray-700 flex items-center mb-1">
                            <FaClipboardList className="mr-2" /> Job Title
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                    </div>

                    <div>
                        <label className="font-bold text-gray-700 flex items-center mb-1">
                            <FaClipboardList className="mr-2" /> Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded"
                        ></textarea>
                    </div>

                    <div>
                        <label className="font-bold flex items-center mb-1">
                            <FaMapMarkerAlt className="mr-2" /> Location
                        </label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                    </div>

                    <div>
                        <label className="font-bold flex items-center mb-1">
                            <FaMoneyBillAlt className="mr-2" /> Budget (ZAR)
                        </label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                    </div>

                    <div>
                        <label className="font-bold flex items-center mb-1">
                            <FaGraduationCap className="mr-2" /> Required Qualifications
                        </label>
                        <input
                            name="requiredQualifications"
                            value={formData.requiredQualifications}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                    </div>

                    <div>
                        <label className="font-bold flex items-center mb-1">
                            <FaCalendarCheck className="mr-2" /> Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-green-600 text-white font-bold rounded"
                    >
                        <FaPaperPlane className="inline mr-2" />
                        Publish Job
                    </button>

                </form>
            </div>
        </div>
    );
};

export default PostJob;
