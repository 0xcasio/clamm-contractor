'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Network } from '@/components/NetworkSelector';

// Default networks
const DEFAULT_NETWORKS: Network[] = [
  { 
    name: 'Ethereum', 
    chain: 'ETH', 
    chainId: 1,
    icon: 'ethereum',
    rpc: [{ url: 'https://eth.llamarpc.com' }],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  { 
    name: 'Polygon', 
    chain: 'MATIC', 
    chainId: 137,
    icon: 'polygon',
    rpc: [{ url: 'https://polygon-rpc.com' }],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  { 
    name: 'Arbitrum', 
    chain: 'ARB', 
    chainId: 42161,
    icon: 'arbitrum',
    rpc: [{ url: 'https://arb1.arbitrum.io/rpc' }],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  { 
    name: 'Goerli', 
    chain: 'ETH', 
    chainId: 5,
    icon: 'goerli',
    rpc: [{ url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' }],
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18
    }
  }
];

interface NetworkContextType {
  networks: Network[];
  selectedNetwork: Network;
  setSelectedNetwork: (network: Network) => void;
  addNetwork: (network: Network) => void;
  removeNetwork: (chainId: number) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [networks, setNetworks] = useState<Network[]>(DEFAULT_NETWORKS);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(DEFAULT_NETWORKS[0]);

  // Load custom networks from localStorage on mount
  useEffect(() => {
    const customNetworks = localStorage.getItem('customNetworks');
    if (customNetworks) {
      try {
        const parsedNetworks = JSON.parse(customNetworks);
        setNetworks([...DEFAULT_NETWORKS, ...parsedNetworks]);
      } catch (e) {
        console.error('Failed to parse custom networks from localStorage');
      }
    }
  }, []);

  // Save custom networks to localStorage when they change
  const saveCustomNetworks = (networksToSave: Network[]) => {
    const customNetworks = networksToSave.filter(
      network => !DEFAULT_NETWORKS.some(defaultNetwork => defaultNetwork.chainId === network.chainId)
    );
    localStorage.setItem('customNetworks', JSON.stringify(customNetworks));
  };

  const addNetwork = (network: Network) => {
    // Check if network already exists
    if (networks.some(n => n.chainId === network.chainId)) {
      return;
    }
    
    const updatedNetworks = [...networks, network];
    setNetworks(updatedNetworks);
    saveCustomNetworks(updatedNetworks);
  };

  const removeNetwork = (chainId: number) => {
    // Don't allow removing default networks
    if (DEFAULT_NETWORKS.some(network => network.chainId === chainId)) {
      return;
    }
    
    const updatedNetworks = networks.filter(network => network.chainId !== chainId);
    setNetworks(updatedNetworks);
    saveCustomNetworks(updatedNetworks);
    
    // If the selected network is being removed, select the first available network
    if (selectedNetwork.chainId === chainId) {
      setSelectedNetwork(updatedNetworks[0]);
    }
  };

  return (
    <NetworkContext.Provider
      value={{
        networks,
        selectedNetwork,
        setSelectedNetwork,
        addNetwork,
        removeNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
} 