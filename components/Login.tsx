import React, { useState } from 'react';
// Fix: Corrected import path for IconComponents
import { GoogleIcon, FacebookIcon, TwitterIcon, MailIcon, LockClosedIcon, SpinnerIcon } from './IconComponents';
// Fix: Corrected import path for Page and User types from App
import { Page, User } from '../App';
// Fix: Corrected import path for api
import { api } from '../api';

interface LoginProps {
  onNavigate: (page: Page) => void;
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const user = await api.login(email, password);
      onLogin(user);
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
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleInputChange}
                aria-invalid={!!error}
                aria-describedby="login-error"
              />
            </div>
            <div className="relative -mt-px">
               <label htmlFor="password" className="sr-only">Password</label>
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleInputChange}
                aria-invalid={!!error}
                aria-describedby="login-error"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          {error && <p id="login-error" className="text-sm text-center text-red-600" role="alert">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5 text-white" /> : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600">Or continue with</span>
            </div>
        </div>
        <div>
            <div className="flex justify-center space-x-4">
                <button aria-label="Continue with Google" className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <GoogleIcon className="w-5 h-5" />
                </button>
                 <button aria-label="Continue with Facebook" className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <FacebookIcon className="w-5 h-5 text-[#1877F2]" />
                </button>
                 <button aria-label="Continue with Twitter" className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />
                </button>
            </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-700">
          Not a member?{' '}
          <button onClick={() => onNavigate('signup')} className="font-medium text-blue-600 hover:text-blue-500">
            Sign up now
          </button>
        </p>
      </main>
    </div>
  );
};

export default Login;
