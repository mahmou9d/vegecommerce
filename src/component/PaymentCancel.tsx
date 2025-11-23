import React from "react";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-200 to-white p-6">
      <div className="flex flex-col items-center bg-white shadow-xl rounded-3xl p-10 animate-fadeIn">
        <XCircle className="w-24 h-24 text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Your payment was not completed. Please try again or contact support if
          the issue persists.
        </p>
        <button
          onClick={goHome}
          className="px-8 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-all duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
