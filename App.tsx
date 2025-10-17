import React, { useState, useEffect } from 'react';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Couriers from './components/Couriers';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import ResetPasswordSent from './components/ResetPasswordSent';
import ResetPassword from './components/ResetPassword';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import BookShipment from './components/BookShipment';
import AdminPanel from './components/AdminPanel';
import ShipmentDetail from './components/ShipmentDetail';

// Types
export type Page = 'home' | 'login' | 'signup' | 'verify-email' | 'forgot-password' | 'reset-password-sent' | 'reset-password' | 'about' | 'contact-us' | 'dashboard' | 'profile' | 'book-shipment' | 'admin' | 'shipment-detail';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface ShipmentUpdate {
    timestamp: string;
    status: string;
    location: string;
}

export interface Shipment {
    id: string;
    userId: string;
    trackingId: string;
    courier: string;
    origin: string;
    destination: string;
    status: string;
    updates: ShipmentUpdate[];
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: Page, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate('home');
  };
  
  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Couriers />
            <HowItWorks />
            <Features />
            <Pricing />
          </>
        );
      case 'login':
        return <Login onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'signup':
        return <SignUp onNavigate={handleNavigate} />;
      case 'verify-email':
        return <VerifyEmail email={pageData} onNavigate={handleNavigate} />;
      case 'forgot-password':
        return <ForgotPassword onNavigate={handleNavigate} />;
      case 'reset-password-sent':
        return <ResetPasswordSent email={pageData} onNavigate={handleNavigate} />;
      case 'reset-password':
        return <ResetPassword onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
       case 'contact-us':
        return <Contact />;
      case 'dashboard':
        if (!user) {
          handleNavigate('login');
          return null;
        }
        return <Dashboard user={user} onNavigate={handleNavigate} />;
      case 'shipment-detail':
        if (!pageData) {
          handleNavigate('home');
          return null;
        }
        return <ShipmentDetail user={user} shipmentId={pageData} onNavigate={handleNavigate} />;
      case 'profile':
        if (!user) {
          handleNavigate('login');
          return null;
        }
        return <Profile user={user} onUpdateProfile={handleUpdateProfile} onLogout={handleLogout} />;
      case 'book-shipment':
        if (!user) {
          handleNavigate('login');
          return null;
        }
        return <BookShipment user={user} onNavigate={handleNavigate} />;
      case 'admin':
        if (!user || user.role !== 'admin') {
          handleNavigate('home');
          return null;
        }
        return <AdminPanel user={user} onNavigate={handleNavigate} />;
      default:
        return (
          <main className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              <button onClick={() => handleNavigate('home')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">Go Home</button>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={handleNavigate} user={user} onLogout={handleLogout} />
      <div className="flex-grow">
        {renderPage()}
      </div>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
