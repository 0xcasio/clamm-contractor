'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">Clamm Contractor</Link>
            
            <nav className="hidden md:flex ml-8">
              <ul className="flex gap-6">
                <li>
                  <Link 
                    href="/deploy" 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Deploy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/modify" 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Modify
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div>
            <select className="px-3 py-1.5 border rounded-md text-sm mr-3">
              <option>Ethereum</option>
              <option>Polygon</option>
              <option>Arbitrum</option>
              <option>Goerli (Testnet)</option>
            </select>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 