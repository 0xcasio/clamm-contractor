'use client';

import React, { useState, useEffect } from 'react';
import { 
  TOKEN_PAIRS,
  CONTRACT_ADDRESSES
} from '@/contracts';
import { useNetwork } from '@/contexts/NetworkContext';

// Define contract function type
interface ContractFunction {
  name: string;
  params: string[];
}

// Define deployed contract type
interface DeployedContract {
  name: string;
  type: 'OptionMarket' | 'PositionManager' | 'LiquidityHandler' | 'OptionPricing' | 'AutoExercise' | 'LimitOrders';
  network: string;
  chainId: number;
  date: string;
  status: 'completed' | 'pending';
  address: string;
}

// Define contract functions for each contract type
const CONTRACT_FUNCTIONS: Record<DeployedContract['type'], ContractFunction[]> = {
  OptionMarket: [
    { name: 'mintOption', params: ['optionParams'] },
    { name: 'exerciseOption', params: ['exerciseParams'] },
    { name: 'settleOption', params: ['settleParams'] },
    { name: 'transferOwnership', params: ['newOwner'] },
  ],
  PositionManager: [
    { name: 'mintPosition', params: ['handler', 'mintPositionData'] },
    { name: 'burnPosition', params: ['handler', 'burnPositionData'] },
    { name: 'usePosition', params: ['handler', 'usePositionData'] },
    { name: 'unusePosition', params: ['handler', 'unusePositionData'] },
    { name: 'updateWhitelistHandler', params: ['handler', 'status'] },
  ],
  LiquidityHandler: [
    { name: 'mintPositionHandler', params: ['context', 'mintPositionData'] },
    { name: 'burnPositionHandler', params: ['context', 'burnPositionData'] },
    { name: 'usePositionHandler', params: ['context', 'usePositionData'] },
    { name: 'unusePositionHandler', params: ['context', 'unusePositionData'] },
    { name: 'donateToPositionHandler', params: ['context', 'donatePositionData'] },
  ],
  OptionPricing: [
    { name: 'updateIVSetter', params: ['setter', 'status'] },
    { name: 'updateImpliedVolatilityBPS', params: ['ttl', 'ivBps'] },
    { name: 'updateMinOptionPricePercentage', params: ['percentage'] },
  ],
  AutoExercise: [
    { name: 'autoExercise', params: ['autoExerciseParams'] },
    { name: 'grantRole', params: ['role', 'account'] },
    { name: 'revokeRole', params: ['role', 'account'] },
  ],
  LimitOrders: [
    { name: 'fillOffer', params: ['order', 'signature'] },
    { name: 'matchOrders', params: ['makerOrder', 'takerOrder', 'makerSignature', 'takerSignature'] },
    { name: 'cancelOrder', params: ['order'] },
  ],
};

// Sample deployed contracts
let DEPLOYED_CONTRACTS: DeployedContract[] = [
  { 
    name: 'ETH/USDC Options Market', 
    type: 'OptionMarket', 
    network: 'Ethereum',
    chainId: 1, 
    date: 'March 15, 2025', 
    status: 'completed',
    address: '0x1234567890abcdef1234567890abcdef12345678'
  },
  { 
    name: 'BTC/USDC Options Market', 
    type: 'OptionMarket', 
    network: 'Polygon',
    chainId: 137, 
    date: 'March 20, 2025', 
    status: 'pending',
    address: '0xabcdef1234567890abcdef1234567890abcdef12'
  },
  { 
    name: 'ETH/USDC Pricing Module', 
    type: 'OptionPricing', 
    network: 'Ethereum',
    chainId: 1, 
    date: 'March 10, 2025', 
    status: 'completed',
    address: '0x7890abcdef1234567890abcdef1234567890abcd'
  },
  { 
    name: 'Position Manager', 
    type: 'PositionManager', 
    network: 'Ethereum',
    chainId: 1, 
    date: 'March 5, 2025', 
    status: 'completed',
    address: '0xcdef1234567890abcdef1234567890abcdef1234'
  },
];

export default function ModifyPage() {
  // Get network context
  const { selectedNetwork } = useNetwork();
  
  // State
  const [filteredContracts, setFilteredContracts] = useState<DeployedContract[]>([]);
  const [selectedContract, setSelectedContract] = useState<DeployedContract | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<ContractFunction | null>(null);
  const [functionParams, setFunctionParams] = useState<Record<string, string>>({});
  
  // Filter contracts based on selected network
  useEffect(() => {
    const filtered = DEPLOYED_CONTRACTS.filter(contract => contract.chainId === selectedNetwork.chainId);
    setFilteredContracts(filtered);
    
    // If the currently selected contract doesn't match the new network, reset selection
    if (selectedContract && selectedContract.chainId !== selectedNetwork.chainId) {
      setSelectedContract(filtered.length > 0 ? filtered[0] : null);
      setSelectedFunction(filtered.length > 0 ? CONTRACT_FUNCTIONS[filtered[0].type][0] : null);
      setFunctionParams({});
    } else if (filtered.length > 0 && !selectedContract) {
      setSelectedContract(filtered[0]);
      setSelectedFunction(CONTRACT_FUNCTIONS[filtered[0].type][0]);
    }
  }, [selectedNetwork, selectedContract]);
  
  // Handle contract selection
  const handleContractSelect = (contract: DeployedContract) => {
    setSelectedContract(contract);
    setSelectedFunction(CONTRACT_FUNCTIONS[contract.type][0]);
    setFunctionParams({});
  };
  
  // Handle function selection
  const handleFunctionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedContract) return;
    
    const functionName = e.target.value;
    const newFunction = CONTRACT_FUNCTIONS[selectedContract.type].find(fn => fn.name === functionName);
    if (newFunction) {
      setSelectedFunction(newFunction);
      setFunctionParams({});
    }
  };
  
  // Handle parameter change
  const handleParamChange = (param: string, value: string) => {
    setFunctionParams({
      ...functionParams,
      [param]: value
    });
  };
  
  // Handle function execution
  const handleExecuteFunction = () => {
    if (!selectedContract || !selectedFunction) return;
    
    console.log(`Executing ${selectedFunction.name} on ${selectedContract.name} (${selectedContract.address}) on network ${selectedNetwork.name} with params:`, functionParams);
    // Here we would actually call the contract function
    alert(`Function call data logged to console. In a real app, this would execute the function on the contract.`);
  };
  
  // Render parameter inputs based on selected function
  const renderParamInputs = () => {
    if (!selectedFunction) return null;
    
    return selectedFunction.params.map(param => (
      <div key={param}>
        <label className="block text-sm font-medium mb-1">{param}</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          placeholder={`Enter ${param}`}
          value={functionParams[param] || ''}
          onChange={(e) => handleParamChange(param, e.target.value)}
        />
      </div>
    ));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">CLAMM Contract Dashboard - Modify</h1>
      <p className="mb-6">Interact with deployed CLAMM contracts by executing their functions.</p>
      
      {filteredContracts.length === 0 ? (
        <div className="p-6 border rounded-lg bg-gray-50 text-center">
          <p className="text-lg font-medium mb-2">No contracts found on {selectedNetwork.name}</p>
          <p className="text-gray-600 mb-4">There are no deployed contracts on the current network. Switch networks or deploy new contracts.</p>
          <div className="p-2 bg-blue-50 rounded border border-blue-200 inline-flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-sm text-blue-800">Current Network: {selectedNetwork.name} (Chain ID: {selectedNetwork.chainId})</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Deployed Contracts on {selectedNetwork.name}</h2>
            
            <div className="space-y-3">
              {filteredContracts.map((contract, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedContract === contract ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleContractSelect(contract)}
                >
                  <h3 className="font-medium">{contract.name}</h3>
                  <p className="text-sm text-gray-600">
                    {contract.date} · 
                    <span className="text-xs text-gray-500 ml-1 font-mono">{contract.address.substring(0, 10)}...</span>
                  </p>
                  <span className={`inline-block px-2 py-0.5 mt-1 text-xs rounded-full ${
                    contract.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contract.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Contract Functions</h2>
            
            {selectedContract ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Selected Contract</label>
                  <div className="p-2 bg-gray-100 rounded">
                    <span className="font-medium">{selectedContract.name}</span>
                    <div className="text-sm text-gray-600 mt-1">
                      Type: <span className="font-mono">{selectedContract.type}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Address: <span className="font-mono">{selectedContract.address.substring(0, 10)}...</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Function</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={selectedFunction?.name || ''}
                    onChange={handleFunctionSelect}
                  >
                    {CONTRACT_FUNCTIONS[selectedContract.type].map((fn: ContractFunction) => (
                      <option key={fn.name} value={fn.name}>{fn.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Parameters</h3>
                  {renderParamInputs()}
                </div>
                
                <button 
                  onClick={handleExecuteFunction}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Execute {selectedFunction?.name}
                </button>
              </div>
            ) : (
              <div className="text-gray-500 text-center p-4">
                Select a contract to view available functions
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 