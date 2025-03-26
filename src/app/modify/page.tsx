'use client';

import React from 'react';

export default function ModifyPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">CLAMM Contract Dashboard - Modify</h1>
      <p className="mb-4">This is the modification page for deployed CLAMM contracts.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Deployed Contracts</h2>
          
          <div className="space-y-2">
            <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">ETH/USDC Options Market</h3>
              <p className="text-sm text-gray-500">Ethereum · March 15, 2025</p>
              <span className="inline-block px-2 py-0.5 mt-1 bg-green-100 text-green-800 text-xs rounded-full">completed</span>
            </div>
            
            <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">BTC/USDC Options Market</h3>
              <p className="text-sm text-gray-500">Polygon · March 20, 2025</p>
              <span className="inline-block px-2 py-0.5 mt-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">pending</span>
            </div>
          </div>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Contract Functions</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Selected Contract</label>
              <select className="w-full p-2 border rounded">
                <option>OptionPricingLinearV2_1</option>
                <option>DopexV2PositionManagerV2</option>
                <option>AutoExerciseTimeBased</option>
                <option>LimitOrders</option>
                <option>DopexV2OptionMarket</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Function</label>
              <select className="w-full p-2 border rounded">
                <option>updateBaseIV</option>
                <option>updateIVFactorOverride</option>
                <option>updateSkewFactorOverride</option>
                <option>updateMinBidAskSpread</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Value</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                placeholder="Enter new value"
              />
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Execute Function
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 