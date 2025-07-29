'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Calendar, Bell, Mail, ChevronDown, Menu, X } from 'lucide-react';

export default function MediCareNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-b border-purple-500/20 shadow-2xl backdrop-blur-sm mb-8">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Medicare Logo - Left Side */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">MediCare</h1>
              <p className="text-xs text-purple-200 -mt-1">Healthcare Dashboard</p>
            </div>
          </div>

          {/* Navigation Buttons - Center (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 justify-center max-w-md mx-100">
            <button 
              onClick={() => router.push('/home')}
              className="px-4 xl:px-6 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-lg hover:scale-105 text-sm xl:text-base"
            >
              My Dashboard
            </button>
            <button 
              onClick={() => router.push('/new-patient')}
              className="px-4 xl:px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 text-sm xl:text-base"
            >
              Add New Patient
            </button>
            <button 
              onClick={() => router.push('/old-patient')}
              className="px-4 xl:px-6 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-lg hover:scale-105 text-sm xl:text-base"
            >
              Old Patient
            </button>
          </div>

          {/* Doctor Profile - Right Side */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80" alt="Dr. Sarah Wilson" className="w-full h-full object-cover" />
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">Dr. Sarah Wilson</p>
              <p className="text-purple-200 text-xs">Administrator</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  router.push('/home');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-white/20 text-left"
              >
                My Dashboard
              </button>
              <button 
                onClick={() => {
                  router.push('/new-patient');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-xl transition-all duration-300 font-medium shadow-lg text-left"
              >
                Add New Patient
              </button>
              <button 
                onClick={() => {
                  router.push('/old-patient');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-white/20 text-left"
              >
                Old Patient
              </button>
              
              {/* Mobile Doctor Profile */}
              <div className="md:hidden flex items-center space-x-3 pt-3 border-t border-white/10 mt-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80" alt="Dr. Sarah Wilson" className="w-full h-full object-cover" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-semibold">Dr. Sarah Wilson</p>
                  <p className="text-purple-200 text-xs">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
