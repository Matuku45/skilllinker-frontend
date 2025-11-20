import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockJobs } from '../../data/mockData';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheck } from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundJob = mockJobs.find(j => j.id === parseInt(id));
    setJob(foundJob);
  }, [id]);

  if (!job) return <p className="p-6 text-gray-500">Loading job details...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        &larr; Back to Job Board
      </button>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            {job.status}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{job.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500"><FaBriefcase className="mr-2" /> {job.sdpName}</div>
          <div className="flex items-center text-gray-500"><FaMapMarkerAlt className="mr-2" /> {job.location}</div>
          <div className="flex items-center text-gray-500"><FaCalendarAlt className="mr-2" /> Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Required Qualifications:</h3>
          <ul className="text-gray-700 space-y-1">
            {job.requiredQualifications.map((qual, index) => (
              <li key={index} className="flex items-center"><FaCheck className="mr-2 text-green-500" /> {qual}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
