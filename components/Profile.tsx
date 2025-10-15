import React, { useState } from 'react';
// Fix: Corrected import path for User type from App
import { User } from '../App';
// Fix: Corrected import path for IconComponents
import { UserCircleIcon, MailIcon, UserIcon, LogoutIcon, SpinnerIcon } from './IconComponents';
// Fix: Corrected import path for api
import { api } from '../api';

interface ProfileProps {
  user: User;
  onUpdateProfile: (user: User) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateProfile, onLogout }) => {
  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!name.trim()) {
      setError('Full name cannot be empty.');
      return;
    }
    
    setIsLoading(true);
    try {
        const updatedUser = await api.updateUserProfile({ ...user, name });
        onUpdateProfile(updatedUser);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
        setError(err.message || 'Failed to update profile.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if(error){
      setError('');
    }
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="flex flex-col items-center text-center">
            <UserCircleIcon className="w-24 h-24 text-gray-300" aria-hidden="true" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                User Profile
            </h2>
            <p className="mt-2 text-sm text-gray-700">
                View and manage your account details.
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address-profile" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address-profile"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled
                  value={user.email}
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md bg-gray-100 cursor-not-allowed sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="full-name-profile" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="full-name-profile"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={handleNameChange}
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your Full Name"
                  aria-invalid={!!error}
                  aria-describedby="profile-feedback"
                />
              </div>
            </div>
          </div>
          
          <div id="profile-feedback" className="h-5 text-sm text-center">
            {message && <p className="text-green-600 transition-opacity duration-300" role="status">{message}</p>}
            {error && <p className="text-red-600 transition-opacity duration-300" role="alert">{error}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5 text-white" /> : 'Update Profile'}
            </button>
          </div>
        </form>
        <div className="border-t border-gray-200 pt-6">
             <button
              onClick={onLogout}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogoutIcon className="h-5 w-5 mr-2" />
              Log Out
            </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
