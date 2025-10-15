import React, { useState, useEffect } from 'react';
import { User, Shipment, Page } from '../App';
import { api } from '../api';
import { SpinnerIcon } from './IconComponents';

interface AdminPanelProps {
  user: User;
  onNavigate: (page: Page, data?: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onNavigate }) => {
  const [view, setView] = useState<'users' | 'shipments'>('shipments');
  const [users, setUsers] = useState<User[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        if (view === 'users') {
          const allUsers = await api.getAllUsers();
          setUsers(allUsers);
        } else {
          const allShipments = await api.getAllShipments();
          setShipments(allShipments);
        }
      } catch (err: any) {
        setError(err.message || `Failed to fetch ${view}.`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [view]);

  return (
    <main className="min-h-[calc(100vh-128px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h1>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setView('shipments')}
              className={`${view === 'shipments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Manage Shipments
            </button>
            <button
              onClick={() => setView('users')}
              className={`${view === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Manage Users
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-16">
              <SpinnerIcon className="animate-spin h-8 w-8 text-blue-600" />
            </div>
          ) : error ? (
            <p className="text-center text-red-600 p-8">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              {view === 'shipments' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shipments.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.trackingId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.userId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.courier}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => onNavigate('shipment-detail', s.id)} className="text-blue-600 hover:text-blue-900">View/Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {view === 'users' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
