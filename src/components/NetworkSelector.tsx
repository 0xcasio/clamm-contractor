'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useNetwork } from '@/contexts/NetworkContext';

// Define Network interface
export interface Network {
  name: string;
  chain: string;
  icon?: string;
  chainId: number;
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpc: { url: string }[];
}

export default function NetworkSelector() {
  const { networks, selectedNetwork, setSelectedNetwork, addNetwork, removeNetwork } = useNetwork();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Network modal state
  const [chainId, setChainId] = useState('');
  const [networkData, setNetworkData] = useState<Network | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Function to fetch network data from chainlist.org
  const fetchNetworkData = async () => {
    if (!chainId || isNaN(Number(chainId))) {
      setError('Please enter a valid Chain ID');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setNetworkData(null);
    
    try {
      const response = await fetch('https://chainlist.org/rpcs.json');
      if (!response.ok) {
        throw new Error('Failed to fetch network data');
      }
      
      const data = await response.json();
      const chainIdNum = Number(chainId);
      const network = data.find((net: any) => net.chainId === chainIdNum);
      
      if (network) {
        setNetworkData({
          name: network.name,
          chain: network.chain,
          icon: network.icon,
          chainId: network.chainId,
          nativeCurrency: network.nativeCurrency,
          rpc: network.rpc || [{ url: '' }]
        });
      } else {
        setError(`Network with Chain ID ${chainId} not found`);
      }
    } catch (error) {
      setError('An error occurred while fetching network data');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to add a new network
  const handleAddNetwork = () => {
    if (!networkData) return;
    
    // Check if network already exists
    if (networks.some(network => network.chainId === networkData.chainId)) {
      setError('This network is already added');
      return;
    }
    
    addNetwork(networkData);
    setIsModalOpen(false);
    setChainId('');
    setNetworkData(null);
  };
  
  // Function to select a network
  const selectNetwork = (network: Network) => {
    setSelectedNetwork(network);
    setIsOpen(false);
  };
  
  // Function to remove a custom network
  const handleRemoveNetwork = (chainId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeNetwork(chainId);
  };
  
  // Render network icon (placeholder icons using first letter when no icon is available)
  const renderNetworkIcon = (network: Network) => {
    if (network.icon) {
      return (
        <>
          <img 
            src={`https://icons.llamao.fi/icons/chains/rsz_${network.icon}.jpg`} 
            alt={network.name} 
            className="w-5 h-5 rounded-full"
            onError={(e) => {
              // If image fails to load, show first letter instead
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLDivElement).style.display = 'flex';
              }
            }}
          />
          <div className="w-5 h-5 rounded-full bg-gray-200 hidden items-center justify-center text-xs font-bold">
            {network.name.charAt(0)}
          </div>
        </>
      );
    }
    
    return (
      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
        {network.name.charAt(0)}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Network Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50"
        >
          <div className="flex items-center space-x-2">
            {renderNetworkIcon(selectedNetwork)}
            <span className="text-sm font-medium hidden sm:block">{selectedNetwork.name}</span>
          </div>
          <ChevronDown size={16} />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1 max-h-60 overflow-y-auto">
              {networks.map((network) => (
                <div
                  key={network.chainId}
                  className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectNetwork(network)}
                >
                  <div className="flex items-center space-x-2">
                    {renderNetworkIcon(network)}
                    <span>{network.name}</span>
                  </div>
                  
                  {/* Only show remove button for non-default networks */}
                  {!networks.slice(0, 4).some(n => n.chainId === network.chainId) && (
                    <button 
                      onClick={(e) => handleRemoveNetwork(network.chainId, e)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              
              {/* Add Network Button */}
              <div 
                className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer border-t"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
              >
                <Plus size={16} />
                <span>Add Network</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Network Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Network</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="chainId" className="block text-sm font-medium text-gray-700 mb-1">
                  Chain ID
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="chainId"
                    value={chainId}
                    onChange={(e) => setChainId(e.target.value)}
                    placeholder="e.g. 1, 137, 42161"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  <button
                    onClick={fetchNetworkData}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {isLoading ? 'Loading...' : 'Fetch'}
                  </button>
                </div>
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              </div>
              
              {/* Network Preview */}
              {networkData && (
                <div className="border rounded-md p-4 bg-gray-50">
                  <h4 className="font-medium mb-2">Network Preview</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      {renderNetworkIcon(networkData)}
                      <span className="font-medium">{networkData.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Chain ID: </span>
                      <span>{networkData.chainId}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Currency: </span>
                      <span>{networkData.nativeCurrency?.symbol} ({networkData.nativeCurrency?.name})</span>
                    </div>
                    <div>
                      <span className="text-gray-500">RPC URL: </span>
                      <span className="font-mono text-xs break-all">{networkData.rpc[0]?.url}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNetwork}
                  disabled={!networkData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
                >
                  Add Network
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 