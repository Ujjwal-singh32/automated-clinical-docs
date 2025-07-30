'use client';
import React from 'react';
import {
  Heart, Mail, Phone, MapPin, Facebook, Twitter,
  Linkedin, Instagram
} from 'lucide-react';

export default function MediCareFooter() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-t border-purple-500/20 shadow-2xl backdrop-blur-sm mt-16 w-full">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">MediCare</h3>
                <p className="text-xs text-purple-200">Healthcare Management</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Providing comprehensive healthcare management solutions with cutting-edge technology and compassionate care.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <button key={idx} className="p-2 bg-white/10 hover:bg-white/20 hover:scale-110 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Patients', 'Appointments', 'Medical Records', 'Reports', 'Settings'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-white/80 hover:text-white hover:text-cyan-200 transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              {['General Checkup', 'Consultation', 'Emergency Care', 'Follow-up Care', 'Health Monitoring', 'Telemedicine'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-white/80 hover:text-white hover:text-cyan-200 transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-1" />
                <div className="text-sm text-white/80">
                  <p>123 Healthcare Ave</p>
                  <p>Medical District, MD 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cyan-400" />
                <p className="text-sm text-white/80">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-400" />
                <p className="text-sm text-white/80">support@medicare.com</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium text-white">Emergency Hotline</p>
              <p className="text-lg font-bold text-pink-300">911</p>
              <p className="text-xs text-purple-200">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-purple-500/20 bg-gradient-to-r from-indigo-950 via-purple-950 to-pink-950 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-white/80">
            <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
              <span>© 2025 MediCare. All rights reserved.</span>
              <span className="hidden md:inline text-purple-300">|</span>
              <span className="text-xs text-purple-200">Version 2.1.0</span>
            </div>
            <div className="flex flex-wrap items-center space-x-4">
              {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Support'].map((item, idx) => (
                <a key={idx} href="#" className="hover:text-cyan-200 transition-colors duration-300">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
