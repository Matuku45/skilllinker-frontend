import React from 'react';
import { getJobById, getApplicantsForJob } from '../../data/mockData';

const JobDetails = ({ jobId, onBack }) => {
  const job = getJobById(jobId);
  const applicants = getApplicantsForJob(jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500">Job not found.</p>
          <button onClick={onBack} className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
          Back to Dashboard
        </button>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <p className="text-gray-700 mb-4">{job.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <strong>Location:</strong> {job.location}
            </div>
            <div>
              <strong>Budget:</strong> R{job.budget}
            </div>
            <div>
              <strong>Status:</strong> {job.status}
            </div>
            <div>
              <strong>Deadline:</strong> {job.deadline}
            </div>
            <div>
              <strong>Posted Date:</strong> {job.postedDate}
            </div>
            <div>
              <strong>SDP:</strong> {job.sdpName}
            </div>
          </div>
          <div className="mb-6">
            <strong>Required Qualifications:</strong>
            <ul className="list-disc list-inside mt-2">
              {job.requiredQualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Applicants ({applicants.length})</h2>
            {applicants.length === 0 ? (
              <p className="text-gray-500">No applicants yet.</p>
            ) : (
              <div className="space-y-2">
                {applicants.map(applicant => (
                  <div key={applicant.id} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold">{applicant.firstName} {applicant.lastName}</p>
                    <p className="text-sm text-gray-600">Email: {applicant.email}</p>
                    <p className="text-sm text-gray-600">Location: {applicant.location}</p>
                    <p className="text-sm text-gray-600">Verified: {applicant.verified ? 'Yes' : 'No'}</p>
                    {applicant.qualifications && (
                      <p className="text-sm text-gray-600">Qualifications: {applicant.qualifications.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
