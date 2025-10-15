import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';
// Fix: Corrected import path for IconComponents
import { StepIcon } from './IconComponents';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How It Works</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Tracking your parcel is simple with our easy three-step process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {HOW_IT_WORKS_STEPS.map((item) => (
            <div key={item.step} className="p-6">
              <div className="flex justify-center">
                <StepIcon step={item.step} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
