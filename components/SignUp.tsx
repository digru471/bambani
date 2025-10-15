import React, { useState } from 'react';
// Fix: Corrected import path for IconComponents
import { GoogleIcon, FacebookIcon, TwitterIcon, UserIcon, MailIcon, LockClosedIcon, SpinnerIcon } from './IconComponents';
// Fix: Corrected import path for Page type from App
import { Page } from '../App';
// Fix: Corrected import path for api
import { api } from '../api';

interface SignUpProps {
  onNavigate: (page: Page, email?: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    const name = formData.get('name') as string;

    if (!name.trim()) {
        setError('Full name cannot be empty.');
        setIsLoading(false);
        return;
    }

     if (password !== confirmPassword) {
        setError("Passwords do not match!");
        setIsLoading(false);
        return;
    }
    
    try {
        await api.signup(name, email);
        if(email) {
            onNavigate('verify-email', email);
        }
    } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    if (error) {
      setError('');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm">
            <div className="relative">
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                onChange={handleInputChange}
                aria-invalid={!!error}
                aria-describedby="signup-error"
              />
            </div>
            <div className="relative -mt-px">
              <label htmlFor="email-address-signup" className="sr-only">Email address</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address-signup"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleInputChange}
                aria-invalid={!!error}
                aria-describedby="signup-error"
              />
            </div>
            <div className="relative -mt-px">
               <label htmlFor="password-signup" className="sr-only">Password</label>
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password-signup"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleInputChange}
                aria-invalid={!!error}
                aria-describedby="signup-error"
              />
            </div>
             <div className="relative -mt-px">
               <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                aria-invalid={!!error}
                aria-describedby="signup-error"
              />
            </div>
          </div>
          
          {error && <p id="signup-error" className="text-sm text-center text-red-600" role="alert">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5 text-white" /> : 'Sign up'}
            </button>
          </div>
        </form>
         <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600">Or sign up with</span>
            </div>
        </div>
        <div>
            <div className="flex justify-center space-x-4">
                <button aria-label="Sign up with Google" className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <GoogleIcon className="w-5 h-5" />
                </button>
                 <button aria-label="Sign up with Facebook" className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <FacebookIcon className="w-5 h-5 text-[#1877F2]" />
                </button>
                 <button aria-label="Sign up with Twitter" className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />
                </button>
            </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-700">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </button>
        </p>
      </main>
    </div>
  );
};

export default SignUp;
