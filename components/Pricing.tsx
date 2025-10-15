import React from 'react';
import { PRICING_PLANS } from '../constants';
// Fix: Corrected import path for IconComponents
import { CheckIcon } from './IconComponents';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Flexible Plans for Everyone
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Choose a plan that works for you. All plans are designed to give you the best tracking experience.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg shadow-lg p-8 border-t-4 transition-transform duration-300 ${plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200 hover:scale-105'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase" aria-hidden="true">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-center text-gray-800">
                {plan.name}
                {plan.popular && <span className="sr-only"> (Most Popular)</span>}
              </h3>
              <p className="text-center text-gray-600 mt-2">{plan.description}</p>
              <div className="mt-6 text-center text-gray-800">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-base font-medium text-gray-500">{plan.priceDetail}</span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckIcon className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button
                  className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
