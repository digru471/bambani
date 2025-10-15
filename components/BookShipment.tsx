import React, { useState } from 'react';
// Fix: Corrected import path for Page and User types from App
import { User, Page } from '../App';
// Fix: Corrected import path for api
import { api } from '../api';
// Fix: Corrected import path for IconComponents
import { SpinnerIcon } from './IconComponents';

interface BookShipmentProps {
  user: User;
  onNavigate: (page: Page) => void;
}

const BookShipment: React.FC<BookShipmentProps> = ({ user, onNavigate }) => {
    const [shipmentType, setShipmentType] = useState<'domestic' | 'international'>('domestic');
    const [courier, setCourier] = useState('FedEx');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [destinationCountry, setDestinationCountry] = useState('');
    const [purpose, setPurpose] = useState('Gift');
    const [hsCode, setHsCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        let fullDestination = destination;
        if (shipmentType === 'international') {
            if (!destinationCountry.trim()) {
                setError('Destination country is required for international shipments.');
                return;
            }
            fullDestination = `${destination}, ${destinationCountry}`;
        }

        if (!origin.trim() || !destination.trim()) {
            setError('Please fill out both origin and destination addresses.');
            return;
        }

        setIsLoading(true);
        try {
            const newShipment = await api.bookShipment(user.id, courier, { origin, destination: fullDestination });
            setSuccessMessage(`Shipment booked successfully! Your tracking ID is ${newShipment.trackingId}. Redirecting...`);
            setTimeout(() => {
                onNavigate('dashboard');
            }, 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to book shipment.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = () => {
        if (error) setError('');
    }

    return (
        <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Book a New Shipment
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-700">
                        Fill in the details below to get started.
                    </p>
                </div>

                <div className="flex border-b border-gray-200">
                    <button
                        type="button"
                        onClick={() => setShipmentType('domestic')}
                        className={`w-1/2 py-3 text-sm font-medium text-center focus:outline-none transition-colors ${
                            shipmentType === 'domestic'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Domestic
                    </button>
                    <button
                        type="button"
                        onClick={() => setShipmentType('international')}
                        className={`w-1/2 py-3 text-sm font-medium text-center focus:outline-none transition-colors ${
                            shipmentType === 'international'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        International
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                     <div className="space-y-4">
                        <div>
                            <label htmlFor="courier" className="block text-sm font-medium text-gray-700 mb-1">Courier Service</label>
                            <select 
                                id="courier" 
                                name="courier"
                                value={courier}
                                onChange={(e) => setCourier(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option>FedEx</option>
                                <option>DHL</option>
                                <option>UPS</option>
                                <option>DTDC</option>
                                <option>Blue Dart</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">Origin Address</label>
                             <input
                                id="origin"
                                name="origin"
                                type="text"
                                required
                                value={origin}
                                onChange={(e) => {setOrigin(e.target.value); handleInputChange();}}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="e.g., New York, NY"
                             />
                        </div>
                         <div>
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination Address</label>
                             <input
                                id="destination"
                                name="destination"
                                type="text"
                                required
                                value={destination}
                                onChange={(e) => {setDestination(e.target.value); handleInputChange();}}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder={shipmentType === 'domestic' ? "e.g., Los Angeles, CA" : "Street Address, City, State"}
                             />
                        </div>

                        {shipmentType === 'international' && (
                            <>
                                <div>
                                    <label htmlFor="destinationCountry" className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
                                    <input
                                        id="destinationCountry"
                                        name="destinationCountry"
                                        type="text"
                                        required
                                        value={destinationCountry}
                                        onChange={(e) => {setDestinationCountry(e.target.value); handleInputChange();}}
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="e.g., Canada"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">Purpose of Shipment</label>
                                    <select
                                        id="purpose"
                                        name="purpose"
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option>Gift</option>
                                        <option>Commercial</option>
                                        <option>Documents</option>
                                        <option>Sample</option>
                                        <option>Personal Effects</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="hsCode" className="block text-sm font-medium text-gray-700 mb-1">HS Code (Optional)</label>
                                    <input
                                        id="hsCode"
                                        name="hsCode"
                                        type="text"
                                        value={hsCode}
                                        onChange={(e) => setHsCode(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="e.g., 9504.50"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    
                    <div className="h-5 text-sm text-center">
                        {error && <p className="text-red-600" role="alert">{error}</p>}
                        {successMessage && <p className="text-green-600" role="status">{successMessage}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading || !!successMessage}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5 text-white" /> : 'Book Shipment'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default BookShipment;
