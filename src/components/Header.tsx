'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NetworkSelector from './NetworkSelector';
import { Wallet } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  
  // Check if a nav link is active
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 font-bold text-lg">
              Stryke CLAMM Dashboard
            </Link>
            <nav className="ml-8 hidden md:flex space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/deploy" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/deploy') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Deploy
              </Link>
              <Link 
                href="/modify" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/modify') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Modify
              </Link>
            </nav>
          </div>
          
          {/* Network Selector and Wallet */}
          <div className="flex items-center space-x-3">
            <NetworkSelector />
            
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-600">
              <Wallet size={16} />
              <span className="hidden sm:inline">Connect Wallet</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 flex">
        <Link 
          href="/" 
          className={`flex-1 text-center py-3 text-sm font-medium ${
            isActive('/') ? 'text-blue-700 border-b-2 border-blue-500' : 'text-gray-600'
          }`}
        >
          Home
        </Link>
        <Link 
          href="/deploy" 
          className={`flex-1 text-center py-3 text-sm font-medium ${
            isActive('/deploy') ? 'text-blue-700 border-b-2 border-blue-500' : 'text-gray-600'
          }`}
        >
          Deploy
        </Link>
        <Link 
          href="/modify" 
          className={`flex-1 text-center py-3 text-sm font-medium ${
            isActive('/modify') ? 'text-blue-700 border-b-2 border-blue-500' : 'text-gray-600'
          }`}
        >
          Modify
        </Link>
      </div>
    </header>
  );
} 