import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { addJob } from '../../utils/localStorage';

const PostJob = ({ onJobPosted }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    requiredQualifications: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      title: formData.title,
      description: formData.description,
      sdpId: currentUser.id,
      sdpName: currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`,
      location: formData.location,
      budget: parseFloat(formData.budget),
      status: 'open',
      requiredQualifications: formData.requiredQualifications.split(',').map(q => q.trim()),
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">Post a New Job</h2>
              <p className="mt-2 text-sm text-gray-600">
                Fill in the details below to create a new job posting for assessors and moderators.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    placeholder="e.g., Assessment Services for IT Certification"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    placeholder="Describe the job requirements, scope, and any specific instructions..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                      placeholder="e.g., Johannesburg"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget (ZAR)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">R</span>
                    </div>
                    <input
                      type="number"
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      min="0"
                      className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
                  Required Qualifications
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="requiredQualifications"
                    id="qualifications"
                    value={formData.requiredQualifications}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    placeholder="e.g., SETA Registered Assessor, IT Certification (comma-separated)"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Separate multiple qualifications with commas</p>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Application Deadline
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
