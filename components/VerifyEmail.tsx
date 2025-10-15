import React, { useState } from 'react';
// Fix: Corrected import path for Page type from App
import { Page } from '../App';
// Fix: Corrected import path for IconComponents
import { EnvelopeOpenIcon } from './IconComponents';

interface VerifyEmailProps {
  email: string | null;
  onNavigate: (page: Page) => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, onNavigate }) => {
  const [resendMessage, setResendMessage] = useState('');

  const handleResend = () => {
    // In a real app, this would trigger an API call
    setResendMessage('A new verification email has been sent!');
    setTimeout(() => setResendMessage(''), 3000);
  };

  if (!email) {
    // Fallback if the page is accessed directly without an email in the state
    return (
      <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-center">
         <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">Something went wrong.</h2>
            <p className="text-gray-700">No email address was provided. Please sign up again.</p>
            <button
                onClick={() => onNavigate('signup')}
                className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Go to Sign Up
            </button>
         </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="flex justify-center" aria-hidden="true">
            <EnvelopeOpenIcon className="w-16 h-16 text-blue-500"/>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-4 text-gray-700">
            We've sent a verification link to <strong className="text-gray-800">{email}</strong>. Please check your inbox and click the link to activate your account.
          </p>
        </div>
        
        <div className="space-y-4 pt-4">
            <button
              onClick={handleResend}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Resend Verification Email
            </button>
             <button
              onClick={() => onNavigate('login')}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Login
            </button>
        </div>
        {resendMessage && (
            <p className="text-sm text-green-600 transition-opacity duration-300" role="status">{resendMessage}</p>
        )}
         <p className="pt-4 text-xs text-gray-600">
            Can't find the email? Check your spam folder or try resending.
        </p>
      </div>
    </main>
  );
};

export default VerifyEmail;
