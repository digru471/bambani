import React, { useState, useEffect } from 'react';
import { User, Shipment, Page } from '../App';
import { api } from '../api';
import { SpinnerIcon } from './IconComponents';

interface ShipmentDetailProps {
  user: User | null;
  shipmentId: string;
  onNavigate: (page: Page) => void;
}

const ShipmentDetail: React.FC<ShipmentDetailProps> = ({ user, shipmentId, onNavigate }) => {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // For admin updates
  const [newStatus, setNewStatus] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  
  const fetchShipment = async () => {
    // Don't set loading to true on refetch, to avoid flicker
    try {
      const fetchedShipment = await api.getShipmentById(shipmentId);
      // Security check: regular users can only see their own shipments if logged in
      if (user && user.role !== 'admin' && fetchedShipment.userId !== user.id) {
          setError('Access denied. You do not have permission to view this shipment.');
          setShipment(null);
      } else {
        fetchedShipment.updates.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setShipment(fetchedShipment);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch shipment details.');
    } finally {
      setIsLoading(false);
    }
  }

  // Effect for the initial data load
  useEffect(() => {
    setIsLoading(true);
    setError('');
    fetchShipment();
  }, [shipmentId, user?.id, user?.role]);

  // Effect for polling every 30 seconds
  useEffect(() => {
    // Only start polling after initial load is complete and there are no errors.
    if (isLoading || error) {
      return;
    }

    const intervalId = setInterval(() => {
      fetchShipment();
    }, 30000); // Refresh every 30 seconds

    // Clean up the interval when the component unmounts or dependencies change.
    return () => clearInterval(intervalId);
  }, [isLoading, error, shipmentId]);


  const handleUpdateStatus = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newStatus.trim() || !newLocation.trim() || !shipment) {
          setUpdateError('Please provide both status and location.');
          return;
      }
      setIsUpdating(true);
      setUpdateError('');
      try {
        await api.updateShipmentStatus(shipment.id, newStatus, newLocation);
        // Refetch to show updated data immediately
        await fetchShipment();
        setNewStatus('');
        setNewLocation('');
      } catch (err: any) {
          setUpdateError(err.message || 'Failed to update status.');
      } finally {
          setIsUpdating(false);
      }
  }

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50">
        <SpinnerIcon className="animate-spin h-10 w-10 text-blue-600" />
      </main>
    );
  }

  const backDestination = user ? (user.role === 'admin' ? 'admin' : 'dashboard') : 'home';
  const backButtonText = user ? 'Back to List' : 'Track Another Shipment';

  if (error || !shipment) {
    return (
      <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="mt-2 text-gray-700">{error || 'Shipment not found.'}</p>
            <button
                onClick={() => onNavigate(backDestination)}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
                {backButtonText}
            </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-128px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => onNavigate(backDestination)} className="text-blue-600 hover:text-blue-800 mb-4">&larr; {backButtonText}</button>
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b pb-6">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Tracking ID</h3>
                    <p className="text-lg font-semibold text-gray-900">{shipment.trackingId}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Courier</h3>
                    <p className="text-lg font-semibold text-gray-900">{shipment.courier}</p>
                </div>
                 <div>
                    <h3 className="text-sm font-medium text-gray-500">Current Status</h3>
                    <p className="text-lg font-semibold text-blue-600">{shipment.status}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Origin</h3>
                    <p className="text-lg font-semibold text-gray-900">{shipment.origin}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Destination</h3>
                    <p className="text-lg font-semibold text-gray-900">{shipment.destination}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tracking History</h2>
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {shipment.updates.map((update, updateIdx) => (
                    <li key={update.timestamp}>
                        <div className="relative pb-8">
                        {updateIdx !== shipment.updates.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                            <div>
                                <span className={`h-8 w-8 rounded-full ${updateIdx === 0 ? 'bg-blue-500' : 'bg-gray-400'} flex items-center justify-center ring-8 ring-white`}>
                                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                                <p className="text-sm text-gray-800 font-medium">{update.status}</p>
                                <p className="text-sm text-gray-600">{update.location}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time dateTime={update.timestamp}>{new Date(update.timestamp).toLocaleString()}</time>
                            </div>
                            </div>
                        </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>

            {user && user.role === 'admin' && (
                <div className="mt-10 border-t pt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Status (Admin)</h2>
                    <form onSubmit={handleUpdateStatus} className="space-y-4 max-w-lg">
                        <div>
                            <label htmlFor="new-status" className="block text-sm font-medium text-gray-700">New Status</label>
                            <input type="text" id="new-status" value={newStatus} onChange={e => setNewStatus(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="new-location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" id="new-location" value={newLocation} onChange={e => setNewLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        {updateError && <p className="text-red-600 text-sm">{updateError}</p>}
                        <button type="submit" disabled={isUpdating} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400">
                            {isUpdating ? <SpinnerIcon className="animate-spin h-5 w-5 text-white" /> : 'Add Update'}
                        </button>
                    </form>
                </div>
            )}
        </div>
      </div>
    </main>
  );
};

export default ShipmentDetail;
