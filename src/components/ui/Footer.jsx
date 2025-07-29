'use client';
import React from 'react';
import {
  Heart, Mail, Phone, MapPin, Facebook, Twitter,
  Linkedin, Instagram
} from 'lucide-react';

export default function MediCareFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 w-full">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">MediCare</h3>
                <p className="text-xs text-gray-500">Healthcare Management</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Providing comprehensive healthcare management solutions with cutting-edge technology and compassionate care.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <button key={idx} className="p-2 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Patients', 'Appointments', 'Medical Records', 'Reports', 'Settings'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Services</h4>
            <ul className="space-y-2">
              {['General Checkup', 'Consultation', 'Emergency Care', 'Follow-up Care', 'Health Monitoring', 'Telemedicine'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-500 mt-1" />
                <div className="text-sm text-gray-600">
                  <p>123 Healthcare Ave</p>
                  <p>Medical District, MD 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <p className="text-sm text-gray-600">support@medicare.com</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Emergency Hotline</p>
              <p className="text-lg font-bold text-red-600">911</p>
              <p className="text-xs text-gray-500">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-gray-600">
            <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
              <span>© 2025 MediCare. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <span className="text-xs">Version 2.1.0</span>
            </div>
            <div className="flex flex-wrap items-center space-x-4">
              {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Support'].map((item, idx) => (
                <a key={idx} href="#" className="hover:text-blue-600 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
