import React, { useState } from "react";
import { FaUpload, FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();

  const [accreditationFiles, setAccreditationFiles] = useState([]);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAccreditationFiles((prev) => [...prev, ...files]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6">My Profile</h1>

        {/* USER INFO */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">{currentUser.firstName} {currentUser.lastName}</h2>
          <p className="text-gray-600">{currentUser.email}</p>

          {/* Verification Status */}
          <div className="mt-3 flex items-center space-x-2">
            {currentUser.verified ? (
              <>
                <FaCheckCircle className="text-green-500 text-xl" />
                <span className="text-green-600 font-medium">Verified Practitioner</span>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-yellow-500 text-xl" />
                <span className="text-yellow-600 font-medium">Pending Verification</span>
              </>
            )}
          </div>
        </div>

        {/* ACCREDITATION UPLOAD */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Upload Accreditation Documents</h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload your SETA certificate, qualifications, assessor/moderator credentials.
          </p>

          <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition">
            <FaUpload className="text-blue-600 mr-3" />
            <span className="text-blue-600 font-medium">Select Documents</span>
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
          </label>

          {accreditationFiles.length > 0 && (
            <ul className="mt-4 space-y-2">
              {accreditationFiles.map((file, index) => (
                <li key={index} className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* BIO */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Biography</h3>
          <textarea
            className="w-full border p-3 rounded-lg"
            rows="4"
            placeholder="Tell SDPs about your background..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        {/* SKILLS */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="e.g. Assessment, Moderation, Facilitation"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* EXPERIENCE */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          <textarea
            className="w-full border p-3 rounded-lg"
            rows="3"
            placeholder="Years of experience, industries, SETA scope..."
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></textarea>
        </div>

        {/* RATINGS */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Ratings</h3>
          <div className="flex items-center space-x-1">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <FaStar className="text-gray-300" />
          </div>
          <p className="text-gray-500 text-sm mt-1">4.0 Rating (based on completed jobs)</p>
        </div>

        {/* SAVE BUTTON */}
        <div className="text-right">
          <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
