
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const NavButton: React.FC<{ view: View; label: string }> = ({ view, label }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setView(view)}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
          isActive
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
          </svg>
          <h1 className="text-xl font-bold text-gray-800">Clinic Inquiry Manager</h1>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
          <NavButton view="patient" label="Patient View" />
          <NavButton view="therapist" label="Therapist View" />
          <NavButton view="admin" label="Admin View" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
