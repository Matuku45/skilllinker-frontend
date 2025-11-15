import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockJobs } from '../../data/mockData';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobBoard = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Filter only open jobs
    const openJobs = mockJobs.filter(job => job.status === 'open');
    setJobs(openJobs);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <div key={job.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
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
                <div className="flex items-center text-sm text-gray-500">
                  <FaUsers className="mr-2" />
                  {job.applicants.length} applicants
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium text-gray-900 mb-2">Required Qualifications:</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {job.requiredQualifications.map((qual, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="mr-2 text-green-500" />
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/assessor_moderator_dashboard/jobdetails/${job.id}`}
                className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <p className="text-gray-500">No available jobs at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
