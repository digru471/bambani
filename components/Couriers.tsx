import React from 'react';
import { COURIERS } from '../constants';

const Couriers: React.FC = () => {
  return (
    <section id="couriers" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Courier Partners
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with hundreds of courier services to provide tracking for all your shipments.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {COURIERS.map((courier) => (
            <div
              key={courier.name}
              className="flex items-center justify-center p-4 bg-gray-100 rounded-lg transition duration-300 hover:shadow-lg hover:scale-105"
            >
              <img
                src={courier.logo}
                alt={`${courier.name} Logo`}
                className="max-h-12 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Couriers;