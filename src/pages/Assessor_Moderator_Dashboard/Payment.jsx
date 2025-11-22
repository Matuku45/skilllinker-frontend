import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VERIFICATION_FEE = 450.00; // Fee amount

// --- Icons replaced with inline SVGs ---

// FaCheckCircle SVG
const CheckCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47.1 47.1L335.1 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
);

// FaShieldAlt SVG
const ShieldAltIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0c-48.4 0-93.6 15.6-130.1 43.1l-10.8 7.9c-2.4 1.8-4.4 3.7-6.2 5.8C54.6 86.8 32 120.3 32 157.7V344c0 14.8 5.7 29.3 16 40L235.1 498.2c1.9 1.9 4.2 3.5 6.7 4.5 2.5 1 5.3 1.5 8.1 1.5s5.6-.5 8.1-1.5c2.5-1 4.8-2.6 6.7-4.5L464 384c10.3-10.7 16-25.2 16-40V157.7c0-37.4-22.6-70.9-66.9-90.8-1.8-2.1-3.8-4-6.2-5.8l-10.8-7.9C348.4 15.6 303.2 0 256 0zM256 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z"/></svg>
);

// FaCreditCard SVG
const CreditCardIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm72 80H440c13.3 0 24 10.7 24 24s-10.7 24-24 24H136c-13.3 0-24-10.7-24-24s10.7-24 24-24zM80 304c-8.8 0-16 7.2-16 16s7.2 16 16 16h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H80zM240 304c-8.8 0-16 7.2-16 16s7.2 16 16 16h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H240zM80 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H80zM240 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H240z"/></svg>
);

// FaArrowLeft SVG
const ArrowLeftIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H109.3L264.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
);

// FaTimes SVG
const TimesIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
);

// FaLock SVG
const LockIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM368 464H80c-44.2 0-80-35.8-80-80V192c0-44.2 35.8-80 80-80H368c44.2 0 80 35.8 80 80V384c0 44.2-35.8 80-80 80z"/></svg>
);

// FaDollarSign SVG
const DollarSignIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M128 0C177.3 0 224 46.73 224 112c0 53.05-38.5 99.36-96 110.1v69.9c53.97 11.23 96 58.07 96 114.7C224 465.3 177.3 512 128 512S32 465.3 32 399.8c0-56.5 42.03-103.4 96-114.7V222.1C81.5 211.3 43 164.9 43 112c0-65.27 46.73-112 101.4-112h-15.4zM96 112c0-17.67 14.33-32 32-32s32 14.33 32 32c0 17.67-14.33 32-32 32s-32-14.33-32-32zM128 352c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32z"/></svg>
);

// HiOutlineDocumentCheck SVG
const DocumentCheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.5v-2.25a3.375 3.375 0 0 0-3.375-3.375h-3.825a1.125 1.125 0 0 0-1.074.832L1.932 9.074a3.375 3.375 0 0 0-1.332 3.375v4.306a4.5 4.5 0 0 0 4.5 4.5h11.25a4.5 4.5 0 0 0 4.5-4.5v-2.25m-18.75 0v-2.25m18.75 2.25v-2.25M12 12l2-2m-2 2l-2-2m2 2l-2 2m2-2l2 2"/></svg>
);

// --- PaymentSuccessModal Component ---
const PaymentSuccessModal = ({ payment, onClose, navigateToDashboard }) => {
    // Format the date nicely
    const date = payment.timestamp ? new Date(payment.timestamp).toLocaleString() : 'N/A';
    const isError = payment.id === 'FAILED' || payment.id === 'ERROR-NO-ID';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 transform transition-all duration-300 scale-100">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <TimesIcon className="w-5 h-5" />
                </button>

                <div className="text-center">
                    {!isError ? (
                        <CheckCircleIcon className="mx-auto text-7xl text-green-500 mb-4 h-20 w-20" />
                    ) : (
                        <TimesIcon className="mx-auto text-7xl text-red-500 mb-4 h-20 w-20" />
                    )}
                    
                    <h2 className={`text-3xl font-extrabold mb-2 ${isError ? 'text-red-700' : 'text-gray-800'}`}>
                        {isError ? 'Payment Failed' : 'Payment Successful!'}
                    </h2>
                    <p className="text-lg text-gray-500 mb-6">
                        {isError 
                            ? 'We encountered an error. Please try again or contact support.' 
                            : 'Verification fee processed. Your status update is underway.'
                        }
                    </p>
                </div>

                {/* Transaction Details */}
                <div className={`space-y-3 p-4 rounded-lg border-2 ${isError ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <h3 className={`text-xl font-bold mb-3 flex items-center ${isError ? 'text-red-700' : 'text-green-700'}`}>
                        <DollarSignIcon className="mr-2 w-5 h-5" /> Transaction Summary
                    </h3>
                    <DetailRow label="Amount Attempted" value={`R${payment.amount.toFixed(2)}`} highlight={true} isError={isError} />
                    <DetailRow label="Transaction ID" value={payment.id || 'N/A'} isError={isError} />
                    {isError && <DetailRow label="Error Message" value={payment.error || 'N/A'} isError={isError} />}
                    <DetailRow label="Time" value={date} isError={isError} />
                    <DetailRow label="Method" value={payment.paymentMethod || 'Bank Transfer'} isError={isError} />
                </div>

                {/* Call to Action */}
                <button
                    onClick={navigateToDashboard}
                    className={`w-full mt-8 flex items-center justify-center px-6 py-3 text-lg font-bold rounded-xl shadow-md transition-all duration-300 ${isError ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white hover:shadow-lg`}
                >
                    <DocumentCheckIcon className="mr-3 w-6 h-6" />
                    {isError ? 'Return to Dashboard' : 'Go to Assessor Dashboard'}
                </button>

            </div>
        </div>
    );
};

// Helper for detail rows
const DetailRow = ({ label, value, highlight = false, isError = false }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className={`font-semibold ${highlight ? (isError ? 'text-red-800 text-lg' : 'text-green-800 text-lg') : 'text-gray-800'}`}>{value}</span>
    </div>
);


// --- Main Payment Component ---
const Payment = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);

    // Function to handle navigation from the modal
    const navigateToDashboard = () => {
        setShowModal(false);
        navigate('/assessor/dashboard');
    }

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            // NOTE: Since the useAuth context is not available here, we use placeholder data
            // but include an Authorization header to acknowledge the intent of the user's previous code.
            const payload = {
                payerUserId: 1, // Should be currentUser.id in a real app
                payeeUserId: 1,    
                jobId: 1,          
                amount: VERIFICATION_FEE,
                paymentMethod: 'bank_transfer',
                status: 'pending'
            };

            // Implementation of exponential backoff for retries
            const maxRetries = 3;
            let response = null;
            let lastError = null;

            for (let i = 0; i < maxRetries; i++) {
                try {
                    response = await axios.post(
                        'http://localhost:3000/api/payments', 
                        payload,
                        {
                            // Placeholder token to simulate user's intent to send credentials
                            headers: { Authorization: `Bearer PLACEHOLDER_AUTH_TOKEN` }
                        }
                    );
                    break; // Success! Break out of the retry loop
                } catch (error) {
                    lastError = error;
                    if (i < maxRetries - 1) {
                        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
                        await new Promise(resolve => setTimeout(resolve, delay));
                    }
                }
            }

            if (!response) {
                // If all retries failed
                throw lastError; 
            }
            
            if (response.data && response.data.payment) {
                // On successful API call, save details and show the modal
                setPaymentDetails({
                    ...response.data.payment,
                    amount: VERIFICATION_FEE, 
                    timestamp: Date.now(),
                    id: response.data.payment.id || 'N/A'
                });
                setShowModal(true);

            } else {
                // Handle non-successful 2xx responses (e.g., if API structure is wrong)
                console.error("Payment API returned success but no payment object.");
                setPaymentDetails({ 
                    id: 'ERROR-NO-ID', 
                    amount: VERIFICATION_FEE, 
                    paymentMethod: 'N/A', 
                    timestamp: Date.now(),
                    error: 'Server responded successfully but missing payment data.'
                });
                setShowModal(true);
            }

        } catch (error) {
            console.error('Error processing payment:', error);
            // Handle error by showing a customized error modal 
            setPaymentDetails({
                id: 'FAILED',
                amount: VERIFICATION_FEE,
                error: error.message || 'Check connection or server logs.',
                timestamp: Date.now()
            });
            setShowModal(true); 
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="max-w-3xl mx-auto">

                {/* --- Back Button --- */}
                <button
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-white/80 hover:text-white transition-colors mb-6 text-sm font-semibold"
                >
                    <ArrowLeftIcon className="mr-2 w-4 h-4" /> Back to Dashboard
                </button>

                {/* --- Main Payment Card --- */}
                <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-100 transform transition-transform duration-500 hover:scale-[1.01]">
                    
                    {/* Header */}
                    <div className="text-center mb-8 pb-6 border-b border-gray-200">
                        {/* Removed animate-bounce-slow as it is undefined */}
                        <ShieldAltIcon className="mx-auto text-6xl text-blue-600 mb-3 h-16 w-16" />
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
                            <LockIcon className="text-yellow-500 w-5 h-5" /> Unlock Verified Access
                        </h2>
                        
                        <p className="text-gray-600 leading-relaxed">
                            A one-time verification fee is required to cover the costs associated with **document processing**, **accreditation checks**, and ensuring the integrity of the SkillLinker platform for all Skill Development Providers (SDPs).
                        </p>

                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li className="flex items-center">
                                <CheckCircleIcon className="text-green-500 mr-2 w-5 h-5 flex-shrink-0" />
                                **Full Profile Visibility** to SDPs.
                            </li>
                            <li className="flex items-center">
                                <CheckCircleIcon className="text-green-500 mr-2 w-5 h-5 flex-shrink-0" />
                                Access to **Premium Assessor/Moderator Jobs**.
                            </li>
                            <li className="flex items-center">
                                <CheckCircleIcon className="text-green-500 mr-2 w-5 h-5 flex-shrink-0" />
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
                                <CreditCardIcon className="mr-3 w-6 h-6" />
                                Pay R{VERIFICATION_FEE.toFixed(2)} and Get Verified
                            </>
                        )}
                    </button>
                    
                    <p className="text-center text-sm text-gray-400 mt-4">
                        Powered by SecurePay & SkillLinker Security.
                    </p>

                </div>
            </div>

            {/* --- Conditional Modal Render --- */}
            {showModal && paymentDetails && (
                <PaymentSuccessModal 
                    payment={paymentDetails}
                    onClose={() => setShowModal(false)}
                    navigateToDashboard={navigateToDashboard}
                />
            )}
        </div>
    );
};

export default Payment;