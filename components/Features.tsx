import React from 'react';
import { FEATURES } from '../constants';
// Fix: Corrected import path for IconComponents
import { GlobeIcon, RocketIcon, GiftIcon, MailIcon, TranslateIcon, DevicePhoneMobileIcon } from './IconComponents';

const featureIcons = [
    <GlobeIcon className="w-10 h-10 text-blue-500" />,
    <RocketIcon className="w-10 h-10 text-blue-500" />,
    <GiftIcon className="w-10 h-10 text-blue-500" />,
    <MailIcon className="w-10 h-10 text-blue-500" />,
    <TranslateIcon className="w-10 h-10 text-blue-500" />,
    <DevicePhoneMobileIcon className="w-10 h-10 text-blue-500" />
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Features</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            We offer a range of features to make shipment tracking seamless and efficient.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={feature.title} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  {featureIcons[index % featureIcons.length]}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
