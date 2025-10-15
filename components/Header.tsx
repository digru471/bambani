import React, { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '../constants';
// Fix: Corrected import path for Page and User types from App
import { User, Page } from '../App';
// Fix: Corrected import path for IconComponents
import { UserCircleIcon } from './IconComponents';

interface HeaderProps {
    onNavigate: (page: Page, data?: any) => void;
    user: User | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    
    const handleNavClick = (href: string) => {
        setIsMenuOpen(false);
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
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                         <button onClick={() => onNavigate('home')} className="text-xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
                            CourierMitra
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:space-x-8">
                        {NAV_LINKS.map(link => (
                            <button key={link.name} onClick={() => handleNavClick(link.href)} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                {link.name}
                            </button>
                        ))}
                    </nav>

                    {/* Auth buttons / User menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="relative" ref={profileMenuRef}>
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                                >
                                    <UserCircleIcon className="w-8 h-8" />
                                    <span className="font-medium">{user.name}</span>
                                </button>
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        {user.role !== 'user' && (
                                           <button onClick={() => { handleNavClick('admin'); setIsProfileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</button>
                                        )}
                                        <button onClick={() => { handleNavClick('dashboard'); setIsProfileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</button>
                                        <button onClick={() => { handleNavClick('profile'); setIsProfileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                                        <div className="border-t border-gray-100"></div>
                                        <button onClick={() => { onLogout(); setIsProfileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Log Out</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button onClick={() => onNavigate('login')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    Login
                                </button>
                                <button onClick={() => onNavigate('signup')} className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {NAV_LINKS.map(link => (
                            <button key={link.name} onClick={() => handleNavClick(link.href)} className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                                {link.name}
                            </button>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {user ? (
                            <div className="px-5">
                                <div className="font-medium text-base text-gray-800">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                <div className="mt-3 space-y-1">
                                    {user.role !== 'user' && (
                                         <button onClick={() => handleNavClick('admin')} className="block w-full text-left rounded-md py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">Admin Panel</button>
                                    )}
                                    <button onClick={() => handleNavClick('dashboard')} className="block w-full text-left rounded-md py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">Dashboard</button>
                                    <button onClick={() => handleNavClick('profile')} className="block w-full text-left rounded-md py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">Profile</button>
                                    <button onClick={onLogout} className="block w-full text-left mt-2 rounded-md py-2 px-3 text-base font-medium text-red-600 hover:bg-gray-50 hover:text-red-700">Log Out</button>
                                </div>
                            </div>
                        ) : (
                            <div className="px-2 space-y-2">
                                <button onClick={() => handleNavClick('login')} className="block w-full text-left rounded-md py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">Login</button>
                                <button onClick={() => handleNavClick('signup')} className="block w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Sign Up</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
