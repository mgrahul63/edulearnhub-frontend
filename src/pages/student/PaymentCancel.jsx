import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      if (courseId) {
        navigate(`/course/${courseId}`);
      } else {
        navigate('/course-list');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, courseId]);

  const handleRetry = () => {
    if (courseId) {
      navigate(`/course/${courseId}`);
    } else {
      navigate('/course-list');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg 
            className="mx-auto h-20 w-20 text-orange-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>
        <p className="text-lg text-gray-600 mb-2">Your payment was cancelled.</p>
        <p className="text-sm text-gray-500 mb-6">
          Don't worry! Your cart is still saved and you can complete the purchase anytime.
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-orange-800 text-sm">
            Redirecting back to the course in 5 seconds...
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={handleRetry}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          
          <button 
            onClick={() => navigate('/course-list')}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Browse Courses
          </button>
        </div>

        <div className="mt-8 text-left bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check your payment method</li>
            <li>• Ensure you have sufficient funds</li>
            <li>• Contact support if the issue persists</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;