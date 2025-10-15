import React, { useState, useEffect, useRef } from 'react';
import { COURIERS } from '../constants';
// Fix: Corrected import path for IconComponents
import { ChevronDownIcon } from './IconComponents';

const Hero: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingIdError, setTrackingIdError] = useState('');

  const [selectedCourier, setSelectedCourier] = useState(COURIERS[0].name);
  const [searchTerm, setSearchTerm] = useState(COURIERS[0].name);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const filteredCouriers = COURIERS.filter(courier =>
    courier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDropdownOpen && listRef.current) {
        const activeItem = listRef.current.querySelector(`#courier-option-${activeIndex}`);
        activeItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isDropdownOpen]);

  const handleTrack = () => {
    setTrackingIdError('');
    setTrackingResult(null);

    if (!trackingId.trim()) {
      setTrackingIdError('Please enter a valid tracking ID.');
      return;
    }
    
    setTrackingResult(`Simulating tracking for ID: ${trackingId} with ${selectedCourier}. In a real app, this would show shipment status.`);
  };
  
  const handleSelectCourier = (courierName: string) => {
    setSelectedCourier(courierName);
    setSearchTerm(courierName);
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
     if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prevIndex => (prevIndex + 1) % filteredCouriers.length);
     } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prevIndex => (prevIndex - 1 + filteredCouriers.length) % filteredCouriers.length);
     } else if (e.key === 'Enter') {
        e.preventDefault();
        if(filteredCouriers[activeIndex]) {
            handleSelectCourier(filteredCouriers[activeIndex].name);
        }
     } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsDropdownOpen(false);
     }
  }

  return (
    <section className="relative bg-cover bg-center py-24 md:py-32" style={{ backgroundImage: 'url(https://picsum.photos/1600/800?grayscale&blur=2)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Track Your Shipment
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Enter your tracking number and select your courier to get real-time updates on your package's location.
        </p>
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack();
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative" ref={dropdownRef}>
                <label htmlFor="courier-search" className="sr-only">Select Courier</label>
                <div className="relative">
                    <input
                      ref={inputRef}
                      id="courier-search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (!isDropdownOpen) setIsDropdownOpen(true);
                        setActiveIndex(0);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      onKeyDown={handleKeyDown}
                      placeholder="Select Courier"
                      role="combobox"
                      aria-autocomplete="list"
                      aria-expanded={isDropdownOpen}
                      aria-controls="courier-listbox"
                      aria-activedescendant={isDropdownOpen ? `courier-option-${activeIndex}` : undefined}
                      className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 pr-10"
                    />
                    <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="absolute inset-y-0 right-0 flex items-center pr-3" aria-label="Toggle courier list">
                        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
                {isDropdownOpen && (
                  <ul
                    ref={listRef}
                    id="courier-listbox"
                    role="listbox"
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto text-left"
                  >
                    {filteredCouriers.length > 0 ? (
                      filteredCouriers.map((courier, index) => (
                        <li
                          key={courier.name}
                          id={`courier-option-${index}`}
                          role="option"
                          aria-selected={index === activeIndex}
                          onClick={() => handleSelectCourier(courier.name)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`px-4 py-2 cursor-pointer ${index === activeIndex ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-blue-50'}`}
                        >
                          {courier.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500 cursor-default">No couriers found</li>
                    )}
                  </ul>
                )}
              </div>
              <div>
                <label htmlFor="tracking-id" className="sr-only">Tracking ID</label>
                <input
                  id="tracking-id"
                  type="text"
                  placeholder="Enter Tracking ID"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    if (trackingIdError) setTrackingIdError('');
                  }}
                  aria-invalid={!!trackingIdError}
                  aria-describedby="tracking-id-error"
                  className={`w-full p-4 border rounded-md focus:ring-2 focus:border-blue-500 transition text-gray-700 ${trackingIdError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {trackingIdError && <p id="tracking-id-error" className="text-red-600 text-sm mt-1 text-left" role="alert">{trackingIdError}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold p-4 rounded-md transition duration-300 flex items-center justify-center text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Track
            </button>
          </form>
        </div>
        {trackingResult && (
          <div className="mt-6 max-w-3xl mx-auto bg-blue-100 text-blue-800 p-4 rounded-md text-center" role="status" aria-live="polite">
            {trackingResult}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
