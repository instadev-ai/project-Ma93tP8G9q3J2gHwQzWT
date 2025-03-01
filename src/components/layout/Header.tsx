import React from 'react';
import { Dumbbell, User, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell size={28} className="text-orange-500" />
            <h1 className="text-xl font-bold font-['Montserrat']">LIFT TRACKER</h1>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 hover:text-orange-400 transition-colors">
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/workouts" className="flex items-center gap-1 hover:text-orange-400 transition-colors">
              <Dumbbell size={18} />
              <span>Workouts</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-1 hover:text-orange-400 transition-colors">
              <User size={18} />
              <span>Profile</span>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-full hover:bg-blue-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;