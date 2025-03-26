'use client';

import React from 'react';

export default function DeployPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">CLAMM Contract Dashboard - Deploy</h1>
      <p className="mb-4">This is the deployment page for CLAMM contracts.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Contract Selection</h2>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-100 rounded">OptionPricingLinearV2_1</li>
            <li className="p-2 bg-gray-100 rounded">DopexV2PositionManagerV2</li>
            <li className="p-2 bg-gray-100 rounded">AutoExerciseTimeBased</li>
            <li className="p-2 bg-gray-100 rounded">LimitOrders</li>
            <li className="p-2 bg-gray-100 rounded">DopexV2OptionMarket</li>
          </ul>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Deployment Name</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                placeholder="ETH/USDC Options Market"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Network</label>
              <select className="w-full p-2 border rounded">
                <option>Ethereum</option>
                <option>Polygon</option>
                <option>Arbitrum</option>
                <option>Goerli (Testnet)</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Deploy Contract
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 