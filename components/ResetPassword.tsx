import React, { useState } from 'react';
// Fix: Corrected import path for Page type from App
import { Page } from '../App';
// Fix: Corrected import path for IconComponents
import { LockClosedIcon, KeyIcon } from './IconComponents';

interface ResetPasswordProps {
  onNavigate: (page: Page) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSuccess('Password has been reset successfully!');
    setTimeout(() => {
        onNavigate('login');
    }, 2000);
  };
  
  const handleInputChange = () => {
      if (error) setError('');
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
            <div className="flex justify-center mb-4" aria-hidden="true">
                 <KeyIcon className="w-16 h-16 text-blue-500"/>
            </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Set a New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-700">
            Please enter and confirm your new password below.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm">
            <div className="relative">
               <label htmlFor="new-password" className="sr-only">New Password</label>
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="new-password"
                name="new-password"
                type="password"
                required
                value={password}
                onChange={(e) => {setPassword(e.target.value); handleInputChange();}}
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
                aria-invalid={!!error}
                aria-describedby="reset-feedback"
              />
            </div>
             <div className="relative -mt-px">
               <label htmlFor="confirm-new-password" className="sr-only">Confirm New Password</label>
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirm-new-password"
                name="confirm-new-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value); handleInputChange();}}
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm New Password"
                aria-invalid={!!error}
                aria-describedby="reset-feedback"
              />
            </div>
          </div>
          
          <div id="reset-feedback" className="h-5 text-sm text-center">
            {error && <p className="text-red-600" role="alert">{error}</p>}
            {success && <p className="text-green-600" role="status">{success}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={!!success}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
