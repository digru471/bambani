import React from 'react';
import { NAV_LINKS } from '../constants';
// Fix: Corrected import path for IconComponents
import { FacebookIcon, TwitterIcon, LinkedinIcon } from './IconComponents';
// Fix: Corrected import path for Page type from App
import { Page } from '../App';

interface FooterProps {
    onNavigate: (page: Page, data?: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      onNavigate(href as Page);
    }
  };

  return (
    <footer id="contact" className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
             <button onClick={() => onNavigate('home')} className="text-xl font-bold text-white mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-md">CourierMitra</button>
            <p className="text-gray-400">
              Your one-stop solution for tracking shipments from hundreds of carriers worldwide. We provide fast, free, and reliable tracking services to help you stay updated on your package's journey.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <button onClick={() => handleNavClick(link.href)} className="text-gray-400 hover:text-white transition-colors text-left">
                      {link.name}
                    </button>
                  </li>
                ))}
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <nav aria-label="Social media links">
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /></a>
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon className="h-6 w-6" /></a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CourierMitra Clone. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
