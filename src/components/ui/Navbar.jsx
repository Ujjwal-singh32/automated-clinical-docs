'use client';
import React, { useState } from 'react';
import { Search, Plus, Calendar, Bell, Mail, ChevronDown, Menu } from 'lucide-react';

export default function MediCareNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo and Breadcrumb */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">MediCare</h1>
              <p className="text-xs text-gray-500 -mt-1">Dashboard</p>
            </div>
          </div>

          {/* Breadcrumb (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Dashboard</span>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 font-medium">Overview</span>
          </div>
        </div>

        {/* Center - Search (hidden on very small screens) */}
        <div className="hidden sm:block flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
          </button>

          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="w-5 h-5" />
          </button>

          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              3
            </span>
          </button>

          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Mail className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              2
            </span>
          </button>

          {/* Profile */}
          <div className="hidden sm:flex items-center space-x-2 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1770&q=80"
                alt="Dr. Sarah Wilson"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Dr. Sarah Wilson</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Optional: Mobile menu dropdown (not implemented, but toggle is available via `mobileMenuOpen`) */}
    </nav>
  );
}
