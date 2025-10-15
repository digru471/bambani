import React, { useState } from 'react';
// Fix: Corrected import path for Page type from App
import { Page } from '../App';
// Fix: Corrected import path for IconComponents
import { MailIcon } from './IconComponents';

interface ForgotPasswordProps {
  onNavigate: (page: Page, email?: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Simulate API check for user existence
    if (email === 'notfound@test.com') {
      setError('No account was found with that email address.');
      return;
    }

    if (email) {
      onNavigate('reset-password-sent', email);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-700">
            No problem. Enter your email address below and we'll send you a link to reset it.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm">
            <div className="relative">
              <label htmlFor="email-address-forgot" className="sr-only">Email address</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address-forgot"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
                aria-invalid={!!error}
                aria-describedby="forgot-password-error"
              />
            </div>
          </div>
          {error && <p id="forgot-password-error" className="text-sm text-center text-red-600" role="alert">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-gray-700">
          Remember your password?{' '}
          <button onClick={() => onNavigate('login')} className="font-medium text-blue-600 hover:text-blue-500">
            Back to Login
          </button>
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;
