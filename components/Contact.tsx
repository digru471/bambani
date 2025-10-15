import React, { useState } from 'react';
// Fix: Corrected import path for IconComponents
import { SpinnerIcon, MapPinIcon, PhoneIcon, MailIcon } from './IconComponents';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackMessage('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setFeedbackMessage('Thank you for your message! We will get back to you shortly.');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFeedbackMessage(''), 5000);
    }, 1500);
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32" style={{ backgroundImage: 'url(https://picsum.photos/seed/contact/1600/600)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question, feedback, or need assistance, our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" id="name" required value={formState.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" id="email" required value={formState.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input type="text" name="subject" id="subject" required value={formState.subject} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" id="message" rows={4} required value={formState.message} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400">
                    {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5 text-white" /> : 'Send Message'}
                  </button>
                </div>
                {feedbackMessage && <p className="text-center text-green-600" role="status">{feedbackMessage}</p>}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
                  <div className="space-y-4 text-gray-700">
                      <div className="flex items-start">
                          <MapPinIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                          <div className="ml-4">
                              <h3 className="text-lg font-semibold text-gray-800">Our Office</h3>
                              <p>123 Shipping Lane, Logistics City, 45678</p>
                          </div>
                      </div>
                      <div className="flex items-start">
                          <PhoneIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                          <div className="ml-4">
                              <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                              <p>(+1) 234-567-890</p>
                          </div>
                      </div>
                      <div className="flex items-start">
                          <MailIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                          <div className="ml-4">
                              <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                              <p>support@couriermitra.clone</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
                  <img src="https://picsum.photos/seed/map/600/400" alt="A map showing the office location." className="rounded-lg shadow-xl w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
