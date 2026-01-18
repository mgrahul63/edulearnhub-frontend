import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl, token } = useContext(AppContext);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      const courseId = searchParams.get('courseId');

      if (!sessionId || !courseId) {
        setError('Invalid payment session');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      try {
        // Verify payment on backend
        const { data } = await axios.post(
          `${backendUrl}/api/payment/verify-session`,
          { sessionId, courseId },
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          }
        );

        if (data.success) {
          setVerifying(false);
          // Redirect to course after 3 seconds
          setTimeout(() => {
            navigate(`/player/${courseId}`);
          }, 3000);
        } else {
          setError('Payment verification failed');
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setError('Failed to verify payment');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    verifyPayment();
  }, [searchParams, navigate, backendUrl, token]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Verifying Payment...</h1>
          <p className="text-gray-600">Please wait while we confirm your enrollment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="mx-auto h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-2">Congratulations! You have been enrolled in the course.</p>
        <p className="text-sm text-gray-500 mb-6">You can now access all course materials and start learning.</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">Redirecting to your course in 3 seconds...</p>
        </div>

        <button 
          onClick={() => navigate('/my-enrollments')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Go to My Enrollments
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;