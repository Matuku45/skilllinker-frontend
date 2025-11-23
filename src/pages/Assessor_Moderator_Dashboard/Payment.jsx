import React, { useState } from 'react';
import axios from 'axios';
// *** FIX 1: Import useNavigate from react-router-dom ***
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext

const VERIFICATION_FEE = 450.00;

// --- Icons (Same as before) ---
const CheckCircleIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> {/* SVG content goes here, assumed missing for brevity */}</svg>;
const ShieldAltIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> {/* SVG content goes here, assumed missing for brevity */}</svg>;
const CreditCardIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"> {/* SVG content goes here, assumed missing for brevity */}</svg>;
const TimesIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"> {/* SVG content goes here, assumed missing for brevity */}</svg>;
const LockIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> {/* SVG content goes here, assumed missing for brevity */}</svg>;
const DollarSignIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"> {/* SVG content goes here, assumed missing for brevity */}</svg>;
const DocumentCheckIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> {/* SVG content goes here, assumed missing for brevity */}</svg>;
const ArrowLeftIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> {/* SVG content goes here, assumed missing for brevity */}</svg>; 


// Helper for rows
const DetailRow = ({ label, value, highlight = false, isError = false }) => (
    <div className="flex justify-between items-center py-1">
        <span className="text-gray-600">{label}:</span>
        <span className={`font-semibold ${highlight ? (isError ? 'text-red-800 text-lg' : 'text-green-800 text-lg') : 'text-gray-800'}`}>
            {value}
        </span>
    </div>
);

// Modal (Content is unchanged)
const PaymentSuccessModal = ({ payment, onClose, navigateToDashboard }) => {
    const date = payment.timestamp ? new Date(payment.timestamp).toLocaleString() : 'N/A';
    const isError = payment.id === 'FAILED' || payment.id === 'ERROR-NO-ID';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 transform transition-all duration-300 scale-100">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
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
                        {isError ? 'We encountered an error. Please try again.' : 'Verification fee processed successfully.'}
                    </p>
                </div>

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

                <button onClick={navigateToDashboard} className={`w-full mt-8 flex items-center justify-center px-6 py-3 text-lg font-bold rounded-xl shadow-md transition-all duration-300 ${isError ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white hover:shadow-lg`}>
                    <DocumentCheckIcon className="mr-3 w-6 h-6" />
                    {isError ? 'Return to Dashboard' : 'Go to Assessor Dashboard'}
                </button>

            </div>
        </div>
    );
};

const Payment = () => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);
    
    // *** FIX 2: Call the useNavigate hook to get the navigation function ***
    const navigate = useNavigate(); 
    
    // The navigateToDashboard function now uses the real navigate function
    const navigateToDashboard = () => { setShowModal(false); navigate('/assessor/dashboard'); }

    const handlePayment = async () => {
        if (!currentUser?.token) return alert('You must be logged in.');
        setIsLoading(true);

        try {
            const payload = {
                payerUserId: currentUser.id,
                payeeUserId: 1,
                jobId: 1,
                amount: VERIFICATION_FEE,
                paymentMethod: 'bank_transfer',
                status: 'pending'
            };

            const response = await axios.post(
                'http://localhost:3000/api/payments',
                payload,
                { headers: { Authorization: `Bearer ${currentUser.token}` } }
            );

            // Assuming response.data.payment contains the transaction details
            setPaymentDetails({ ...response.data.payment, amount: VERIFICATION_FEE, timestamp: Date.now(), id: response.data.payment.id || 'N/A' });
            setShowModal(true);

        } catch (error) {
            const userError = error.response?.data?.details || error.response?.data?.error || error.message || 'An unknown error occurred.';
            setPaymentDetails({ id: 'FAILED', amount: VERIFICATION_FEE, error: userError, timestamp: Date.now() });
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-indigo-500 to-purple-600 font-sans">
            <div className="max-w-3xl mx-auto">
                {/* *** FIX 3: This button now uses the real navigate function to go back *** */}
                <button onClick={() => navigate('/assessor/dashboard')} className="flex items-center text-white/80 hover:text-white mb-6 text-sm font-semibold">
                    <ArrowLeftIcon className="mr-2 w-4 h-4" /> Back to Dashboard
                </button>

                <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-100 transform transition-transform duration-500">
                    <div className="text-center mb-8 pb-6 border-b border-gray-200">
                        <ShieldAltIcon className="mx-auto text-6xl text-blue-600 mb-3 h-16 w-16" />
                        <h1 className="text-3xl font-extrabold text-gray-800">Verification Fee Required</h1>
                        <p className="text-lg text-gray-500 mt-2">Secure your access to exclusive job postings.</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                            <LockIcon className="text-yellow-500 w-5 h-5" /> Unlock Verified Access
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            A one-time verification fee is required to cover document processing, accreditation checks, and ensuring platform integrity.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li className="flex items-start"><CheckCircleIcon className="text-green-500 mr-2 w-5 h-5 mt-1" /> Full Profile Visibility to SDPs.</li>
                            <li className="flex items-start"><CheckCircleIcon className="text-green-500 mr-2 w-5 h-5 mt-1" /> Access to Premium Assessor/Moderator Jobs.</li>
                            <li className="flex items-start"><CheckCircleIcon className="text-green-500 mr-2 w-5 h-5 mt-1" /> Completion of your official Verification Status.</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200 shadow-inner">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-700">One-Time Verification Fee:</span>
                            <span className="text-3xl font-extrabold text-blue-700">R{VERIFICATION_FEE.toFixed(2)}</span>
                        </div>
                    </div>

                    <button onClick={handlePayment} disabled={isLoading} className={`w-full mt-8 flex items-center justify-center px-6 py-3 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 transform ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.01]'}`}>
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
                                <CreditCardIcon className="mr-3 w-6 h-6" /> Pay R{VERIFICATION_FEE.toFixed(2)} and Get Verified
                            </>
                        )}
                    </button>
                    <p className="text-center text-sm text-gray-400 mt-4">Powered by SecurePay & SkillLinker Security.</p>
                </div>
            </div>

            {showModal && paymentDetails && (
                <PaymentSuccessModal payment={paymentDetails} onClose={() => setShowModal(false)} navigateToDashboard={navigateToDashboard} />
            )}
        </div>
    );
};
export default Payment;