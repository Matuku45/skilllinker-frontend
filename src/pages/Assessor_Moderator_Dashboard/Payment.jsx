import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const VERIFICATION_FEE = 450.0;

// Icons (your SVGs unchanged)
const CheckCircleIcon = (props) => <svg {...props}></svg>;
const ShieldAltIcon = (props) => <svg {...props}></svg>;
const CreditCardIcon = (props) => <svg {...props}></svg>;
const TimesIcon = (props) => <svg {...props}></svg>;
const LockIcon = (props) => <svg {...props}></svg>;
const DollarSignIcon = (props) => <svg {...props}></svg>;
const DocumentCheckIcon = (props) => <svg {...props}></svg>;
const ArrowLeftIcon = (props) => <svg {...props}></svg>;

// Helper row
const DetailRow = ({ label, value, highlight = false, isError = false }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-600">{label}:</span>
    <span
      className={`font-semibold ${
        highlight
          ? isError
            ? 'text-red-800 text-lg'
            : 'text-green-800 text-lg'
          : 'text-gray-800'
      }`}
    >
      {value}
    </span>
  </div>
);

// Modal
const PaymentSuccessModal = ({ payment, onClose, navigateToDashboard }) => {
  const date = payment.timestamp
    ? new Date(payment.timestamp).toLocaleString()
    : 'N/A';
  const isError =
    payment.id === 'FAILED' || payment.id === 'ERROR-NO-ID';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <TimesIcon className="w-5 h-5" />
        </button>

        <div className="text-center">
          {!isError ? (
            <CheckCircleIcon className="mx-auto text-7xl text-green-500 mb-4 h-20 w-20" />
          ) : (
            <TimesIcon className="mx-auto text-7xl text-red-500 mb-4 h-20 w-20" />
          )}

          <h2
            className={`text-3xl font-extrabold mb-2 ${
              isError ? 'text-red-700' : 'text-gray-800'
            }`}
          >
            {isError ? 'Payment Failed' : 'Payment Successful!'}
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            {isError
              ? 'We encountered an error. Please try again.'
              : 'Verification fee processed successfully.'}
          </p>
        </div>

        <div
          className={`space-y-3 p-4 rounded-lg border-2 ${
            isError
              ? 'bg-red-50 border-red-200'
              : 'bg-green-50 border-green-200'
          }`}
        >
          <h3
            className={`text-xl font-bold mb-3 flex items-center ${
              isError ? 'text-red-700' : 'text-green-700'
            }`}
          >
            <DollarSignIcon className="mr-2 w-5 h-5" /> Transaction
            Summary
          </h3>

          <DetailRow
            label="Amount Attempted"
            value={`R${payment.amount.toFixed(2)}`}
            highlight
            isError={isError}
          />

          <DetailRow
            label="Transaction ID"
            value={payment.id || 'N/A'}
            isError={isError}
          />

          {isError && (
            <DetailRow
              label="Error Message"
              value={payment.error || 'N/A'}
              isError={isError}
            />
          )}

          <DetailRow label="Time" value={date} isError={isError} />
          <DetailRow
            label="Method"
            value={payment.paymentMethod || 'Bank Transfer'}
            isError={isError}
          />
        </div>

        <button
          onClick={navigateToDashboard}
          className={`w-full mt-8 flex items-center justify-center px-6 py-3 text-lg font-bold rounded-xl shadow-md ${
            isError
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          <DocumentCheckIcon className="mr-3 w-6 h-6" />
          {isError ? 'Return to Dashboard' : 'Go to Assessor Dashboard'}
        </button>
      </div>
    </div>
  );
};

const Payment = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const [payments, setPayments] = useState([]);
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);

  // 🔥 FETCH PAYMENTS HOOK (your code unchanged)
  const fetchPayments = useCallback(async () => {
    if (!currentUser?.token) return;

    setIsPaymentsLoading(true);
    try {
      const res = await axios.get(
        'https://skilllinker-frontend.onrender.com/payments',
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      setPayments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching payments:', err);
    } finally {
      setIsPaymentsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // FILTER PAYMENTS BY LOGGED-IN USER
  const userPayments = payments.filter(
    (p) => p.payerUserId === currentUser?.id
  );

const handlePayment = async () => {
  if (!currentUser?.token)
    return alert('You must be logged in.');

  setIsLoading(true);

  try {
    const payload = {
      payerUserId: currentUser.id,
      payeeUserId: 1,  
      jobId: 1,
      amount: VERIFICATION_FEE,
      paymentMethod: 'bank_transfer',
      status: 'payed',
    };

    const res = await axios.post(
      'https://skilllinker-frontend.onrender.com/api/payments',
      payload,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    setPaymentDetails({
      ...res.data.payment,
      amount: VERIFICATION_FEE,
      timestamp: Date.now(),
      id: res.data.payment.id || 'N/A',
    });

    setShowModal(true);
    fetchPayments();
  } catch (error) {
    const userError =
      error.response?.data?.details ||
      error.response?.data?.error ||
      error.message ||
      'Unknown error';

    setPaymentDetails({
      id: 'FAILED',
      amount: VERIFICATION_FEE,
      error: userError,
      timestamp: Date.now(),
    });

    setShowModal(true);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="max-w-3xl mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate('/assessor/dashboard')}
          className="flex items-center text-white/80 hover:text-white mb-6 text-sm font-semibold"
        >
          <ArrowLeftIcon className="mr-2 w-4 h-4" /> Back to
          Dashboard
        </button>

        {/* PAYMENT UI (unchanged) */}
        <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 border">
          <div className="text-center mb-8 pb-6 border-b">
            <ShieldAltIcon className="mx-auto text-6xl text-blue-600 mb-3" />
            <h1 className="text-3xl font-extrabold">
              Verification Fee Required
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Secure your access to exclusive job postings.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <LockIcon className="text-yellow-500 w-5 h-5" />
              Unlock Verified Access
            </h2>

            <p className="text-gray-600 leading-relaxed">
              A one-time verification fee is required to cover
              accreditation checks and platform integrity.
            </p>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-200">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">
                One-Time Verification Fee:
              </span>
              <span className="text-3xl font-extrabold text-blue-700">
                R{VERIFICATION_FEE.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isLoading}
            className={`w-full mt-8 flex items-center justify-center px-6 py-3 text-lg font-bold rounded-xl shadow-lg ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                Processing Payment...
              </span>
            ) : (
              <>
                <CreditCardIcon className="mr-3 w-6 h-6" />
                Pay R{VERIFICATION_FEE.toFixed(2)} and Get Verified
              </>
            )}
          </button>
        </div>

{/* 🔥 USER PAYMENTS LIST */}
<div className="mt-10 bg-white shadow-xl rounded-xl p-6">

  {/* Title + Refresh Button */}
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold">Your Payment History</h2>

    <button
      onClick={fetchPayments}
      disabled={isPaymentsLoading}
      className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
    >
      {isPaymentsLoading ? "Refreshing..." : "Refresh"}
    </button>
  </div>

  {/* Loading State */}
  {isPaymentsLoading ? (
    <p className="text-gray-500">Loading payments...</p>
  ) : userPayments.length === 0 ? (

    /* Empty State */
    <p className="text-gray-400">No payments found.</p>

  ) : (

    /* Payments List */
    <div className="space-y-3">
      {userPayments.map((p) => (
        <div
          key={p.id}
          className="p-4 border rounded-lg shadow-sm bg-gray-50"
        >
          <p>
            <strong>Transaction ID:</strong> {p.id}
          </p>

          <p>
            <strong>Amount:</strong> R{p.amount}
          </p>

          <p>
            <strong>Status:</strong> {p.status}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(p.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
        </div>  

      {showModal && paymentDetails && (
        <PaymentSuccessModal
          payment={paymentDetails}
          onClose={() => setShowModal(false)}
          navigateToDashboard={() =>
            navigate('/assessor/dashboard')
          }
        />
      )}
    </div>
  );
};

export default Payment;
