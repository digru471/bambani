import React, { useState, useEffect } from 'react';
import { User, Shipment, Page } from '../App';
import { api } from '../api';
import { SpinnerIcon } from './IconComponents';

interface DashboardProps {
  user: User;
  onNavigate: (page: Page, data?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const userShipments = await api.getUserShipments(user.id);
        setShipments(userShipments);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch shipments.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipments();
  }, [user.id]);
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'out for delivery':
        return 'bg-yellow-100 text-yellow-800';
      case 'booked':
         return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <main className="min-h-[calc(100vh-128px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="mt-1 text-gray-600">Here's a list of your recent shipments.</p>
          </div>
          <button
             onClick={() => onNavigate('book-shipment')}
             className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
           >
             Book a Shipment
           </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center p-16">
                <SpinnerIcon className="animate-spin h-8 w-8 text-blue-600" />
              </div>
            ) : error ? (
              <p className="text-center text-red-600 p-8">{error}</p>
            ) : shipments.length === 0 ? (
              <p className="text-center text-gray-600 p-8">You have no shipments yet.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courier</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.trackingId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.courier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.destination}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => onNavigate('shipment-detail', shipment.id)} className="text-blue-600 hover:text-blue-900">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
