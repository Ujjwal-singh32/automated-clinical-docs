'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInButton, useUser } from '@clerk/nextjs';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function MediCareNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-b border-purple-500/20 shadow-2xl backdrop-blur-sm mb-8">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/home" className="flex flex-col justify-center">
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
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-2 justify-center flex-grow overflow-x-auto">
            <button onClick={() => router.push('/home')} className="px-4 xl:px-6 py-2.5 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-blue-500/30 hover:shadow-lg hover:brightness-110 hover:shadow-md text-sm xl:text-base">
              My Dashboard
            </button>
            <button onClick={() => router.push('/new-patient')} className="px-4 xl:px-6 py-2.5 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-blue-500/30 hover:shadow-lg hover:brightness-110 hover:shadow-md text-sm xl:text-base">
              Add New Patient
            </button>
            <button onClick={() => router.push('/old-patient')} className="px-4 xl:px-6 py-2.5 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-blue-500/30 hover:shadow-lg hover:brightness-110 hover:shadow-md text-sm xl:text-base">
              Old Patient
            </button>
          </div>

          {/* Right Side (User Profile or Sign In) */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            {isSignedIn ? (
              <>
              <Link href="/profile" className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20">
                  <img src={user?.imageUrl} alt={user?.fullName || "User"} className="w-full h-full object-cover" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-semibold">{user?.fullName}</p>
                  <p className="text-purple-200 text-xs">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                </Link>
              </>
            ) : (
              <SignInButton mode="modal">
                <button
                  className="px-4 py-2.5 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-md text-sm"
                >
                  Sign In
                </button>
              </SignInButton>

            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <button onClick={() => { router.push('/home'); setMobileMenuOpen(false); }} className="px-4 py-2.5 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-blue-500/30 text-left">
                My Dashboard
              </button>
              <button onClick={() => { router.push('/new-patient'); setMobileMenuOpen(false); }} className="px-4 py-2.5 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-blue-500/30 hover:shadow-lg text-left">
                Add New Patient
              </button>
              <button onClick={() => { router.push('/old-patient'); setMobileMenuOpen(false); }} className="px-4 py-2.5 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-blue-500/30 text-left">
                Old Patient
              </button>

              {/* Mobile User Section */}
              {isSignedIn ? (
                <>
                  <div
                    className="flex items-center justify-between mt-4 px-4 py-2 border-t border-white/10 cursor-pointer"
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  >
                    <Link href="/profile" className="flex items-center space-x-3 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20">
                        <img src={user?.imageUrl} alt={user?.fullName || "User"} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-sm text-white font-semibold">{user?.fullName}</div>
                    </div>
                    </Link>
                    <ChevronDown className={`w-5 h-5 text-white transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {mobileDropdownOpen && (
                    <div className="px-4 pt-2 pb-4 space-y-2 text-sm text-white/80">
                      <p className="text-white">{user?.primaryEmailAddress?.emailAddress}</p>
                      <button
                        onClick={() => router.push('/profile')}
                        className="w-full text-left hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => router.push('/sign-out')}
                        className="w-full text-left hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <SignInButton mode="modal">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-4 px-4 py-2.5 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 hover:border-white/20 text-left"
                  >
                    Sign In
                  </button>
                </SignInButton>

              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
