import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { addJob } from '../../utils/localStorage';
// Import icons for a nicer UI
import { 
    FaArrowLeft, 
    FaPaperPlane, 
    FaClipboardList, 
    FaMapMarkerAlt, 
    FaMoneyBillAlt, 
    FaGraduationCap, 
    FaCalendarCheck 
} from 'react-icons/fa'; 

const PostJob = ({ onJobPosted, onBack }) => { // Added onBack prop
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        budget: '',
        requiredQualifications: '',
        deadline: ''
    });

    // LOGIC: No change to handleChange
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // LOGIC: No change to handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        const newJob = {
            id: Date.now().toString(), // Added ID for uniqueness
            title: formData.title,
            description: formData.description,
            sdpId: currentUser.id,
            sdpName: currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`,
            location: formData.location,
            // Ensure budget is parsed as a number
            budget: parseFloat(formData.budget), 
            status: 'open',
            // Splits qualifications by comma
            requiredQualifications: formData.requiredQualifications.split(',').map(q => q.trim()).filter(q => q.length > 0), 
            postedDate: new Date().toISOString(),
            deadline: formData.deadline,
            applicants: []
        };
        addJob(newJob);
        onJobPosted(newJob);
        
        // Reset form
        setFormData({
            title: '',
            description: '',
            location: '',
            budget: '',
            requiredQualifications: '',
            deadline: ''
        });
    };

    return (
        // Gradient Background for a premium feel
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="max-w-4xl mx-auto">
                
                {/* Back Button */}
                <button
                    onClick={onBack} 
                    className="flex items-center text-white/90 hover:text-white transition-colors mb-6 text-sm font-semibold p-2 rounded-lg hover:bg-black/10"
                >
                    <FaArrowLeft className="mr-2 text-lg" /> Back to Dashboard
                </button>

                {/* Main Card */}
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden p-8 sm:p-12 border-4 border-white/50">
                    <div className="text-center mb-10">
                        <FaClipboardList className="mx-auto text-6xl text-purple-600 mb-4 animate-pulse-slow" />
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Create a New Job Post
                        </h2>
                        <p className="mt-2 text-lg text-gray-600">
                            Find the best Assessors and Moderators for your projects instantly.
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* 1. Job Title & Description */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Job Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-bold text-gray-700 flex items-center mb-1">
                                    <FaClipboardList className="mr-2 text-blue-500" /> Job Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-5 py-3 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition duration-200 shadow-md"
                                    placeholder="e.g., Moderation for NQF Level 4"
                                />
                            </div>
                             {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-bold text-gray-700 flex items-center mb-1">
                                    <FaMapMarkerAlt className="mr-2 text-red-500" /> Location (Remote/City)
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-5 py-3 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition duration-200 shadow-md"
                                    placeholder="e.g., National Remote or Cape Town"
                                />
                            </div>
                        </div>

                        {/* 2. Job Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-bold text-gray-700 flex items-center mb-1">
                                <FaClipboardList className="mr-2 text-purple-500" /> Detailed Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="block w-full px-5 py-3 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition duration-200 shadow-md"
                                placeholder="Clearly outline the scope of work, required deliverables, and project timeline..."
                            />
                        </div>

                        {/* 3. Budget, Deadline & Qualifications */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            
                            {/* Budget */}
                            <div>
                                <label htmlFor="budget" className="block text-sm font-bold text-gray-700 flex items-center mb-1">
                                    <FaMoneyBillAlt className="mr-2 text-green-500" /> Budget (ZAR)
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-gray-500 font-bold">R</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="budget"
                                        id="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="block w-full pl-10 pr-5 py-3 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:ring-green-500 focus:border-green-500 transition duration-200 shadow-md"
                                        placeholder="10000"
                                    />
                                </div>
                            </div>
                            
                            {/* Deadline */}
                            <div>
                                <label htmlFor="deadline" className="block text-sm font-bold text-gray-700 flex items-center mb-1">
                                    <FaCalendarCheck className="mr-2 text-orange-500" /> Application Deadline
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    id="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-5 py-3 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 transition duration-200 shadow-md"
                                />
                            </div>
                        </div>

                         {/* 4. Required Qualifications */}
                         <div>
                            <label htmlFor="qualifications" className="block text-sm font-bold text-gray-700 flex items-center mb-1">
                                <FaGraduationCap className="mr-2 text-indigo-500" /> Required Qualifications
                            </label>
                            <input
                                type="text"
                                name="requiredQualifications"
                                id="qualifications"
                                value={formData.requiredQualifications}
                                onChange={handleChange}
                                required
                                className="block w-full px-5 py-3 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-md"
                                placeholder="e.g., ETDP SETA Assessor, NQF Level 5, Valid Cheque (comma-separated)"
                            />
                            <p className="mt-1 text-xs text-gray-500 italic">Separate multiple qualifications with a comma (e.g., SETA, NQF Level 6, Moderator)</p>
                        </div>


                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={onBack}
                                className="inline-flex justify-center py-3 px-6 border-2 border-gray-300 shadow-md text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-100 transition duration-200"
                            >
                                <FaArrowLeft className="mr-2 mt-0.5" /> Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-3 px-8 border border-transparent shadow-xl text-base font-bold rounded-xl text-white bg-green-500 hover:bg-green-600 transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-400"
                            >
                                <FaPaperPlane className="mr-2 mt-0.5" /> Publish Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;