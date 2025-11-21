import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaLock, 
    FaShieldAlt, 
    FaCreditCard, 
    FaCheckCircle, 
    FaArrowLeft 
} from 'react-icons/fa';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';

const VERIFICATION_FEE = 450.00; // Mock fee amount

const Payment = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = () => {
        setIsLoading(true);
        // Simulate an asynchronous payment processing delay
        setTimeout(() => {
            setIsLoading(false);
            alert(`Payment of R${VERIFICATION_FEE.toFixed(2)} processed successfully! Your verification process will now begin.`);
            // In a real app, this would redirect to a confirmation page or the dashboard
            navigate('/assessor/dashboard'); 
        }, 3000);
    };

    return (
        // Gradient background for a premium feel
        <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="max-w-3xl mx-auto">

                {/* --- Back Button --- */}
                <button
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-white/80 hover:text-white transition-colors mb-6 text-sm font-semibold"
                >
                    <FaArrowLeft className="mr-2 text-lg" /> Back to Dashboard
                </button>

                {/* --- Main Payment Card --- */}
                <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-100 transform transition-transform duration-500 hover:scale-[1.01]">
                    
                    {/* Header */}
                    <div className="text-center mb-8 pb-6 border-b border-gray-200">
                        <FaShieldAlt className="mx-auto text-6xl text-blue-600 mb-3 animate-bounce-slow" />
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            Verification Fee Required
                        </h1>
                        <p className="text-lg text-gray-500 mt-2">
                            Secure your access to exclusive job postings.
                        </p>
                    </div>

                    {/* Verification Details */}
                    <div className="space-y-4 mb-8">
                        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                            <FaLock className="text-yellow-500" /> Unlock Verified Access
                        </h2>
                        
                        <p className="text-gray-600 leading-relaxed">
                            A one-time verification fee is required to cover the costs associated with **document processing**, **accreditation checks**, and ensuring the integrity of the SkillLinker platform for all Skill Development Providers (SDPs).
                        </p>

                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li className="flex items-center">
                                <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                **Full Profile Visibility** to SDPs.
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                Access to **Premium Assessor/Moderator Jobs**.
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                Completion of your official **Verification Status**.
                            </li>
                        </ul>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200 shadow-inner">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-700">One-Time Verification Fee:</span>
                            <span className="text-3xl font-extrabold text-blue-700">
                                R{VERIFICATION_FEE.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className={`w-full mt-8 flex items-center justify-center px-6 py-3 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 transform 
                            ${isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing Payment...
                            </span>
                        ) : (
                            <>
                                <FaCreditCard className="mr-3 text-xl" />
                                Pay R{VERIFICATION_FEE.toFixed(2)} and Get Verified
                            </>
                        )}
                    </button>
                    
                    <p className="text-center text-sm text-gray-400 mt-4">
                        Powered by SecurePay & SkillLinker Security.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Payment;