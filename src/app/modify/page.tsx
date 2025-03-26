'use client';

import React, { useState } from 'react';
import { 
  TOKEN_PAIRS,
  CONTRACT_ADDRESSES
} from '@/contracts';

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

// Define sample deployed contracts
const DEPLOYED_CONTRACTS: DeployedContract[] = [
  { 
    name: 'ETH/USDC Options Market', 
    type: 'OptionMarket', 
    network: 'Ethereum', 
    date: 'March 15, 2025', 
    status: 'completed',
    address: '0x1234567890abcdef1234567890abcdef12345678'
  },
  { 
    name: 'BTC/USDC Options Market', 
    type: 'OptionMarket', 
    network: 'Polygon', 
    date: 'March 20, 2025', 
    status: 'pending',
    address: '0xabcdef1234567890abcdef1234567890abcdef12'
  },
  { 
    name: 'ETH/USDC Pricing Module', 
    type: 'OptionPricing', 
    network: 'Ethereum', 
    date: 'March 10, 2025', 
    status: 'completed',
    address: '0x7890abcdef1234567890abcdef1234567890abcd'
  },
  { 
    name: 'Position Manager', 
    type: 'PositionManager', 
    network: 'Ethereum', 
    date: 'March 5, 2025', 
    status: 'completed',
    address: '0xcdef1234567890abcdef1234567890abcdef1234'
  },
];

export default function ModifyPage() {
  // State
  const [selectedContract, setSelectedContract] = useState<DeployedContract>(DEPLOYED_CONTRACTS[0]);
  const [selectedFunction, setSelectedFunction] = useState<ContractFunction>(CONTRACT_FUNCTIONS[selectedContract.type][0]);
  const [functionParams, setFunctionParams] = useState<Record<string, string>>({});
  
  // Handle contract selection
  const handleContractSelect = (contract: DeployedContract) => {
    setSelectedContract(contract);
    setSelectedFunction(CONTRACT_FUNCTIONS[contract.type][0]);
    setFunctionParams({});
  };
  
  // Handle function selection
  const handleFunctionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    console.log(`Executing ${selectedFunction.name} on ${selectedContract.name} with params:`, functionParams);
    // Here we would actually call the contract function
    alert(`Function call data logged to console. In a real app, this would execute the function on the contract.`);
  };
  
  // Render parameter inputs based on selected function
  const renderParamInputs = () => {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Deployed Contracts</h2>
          
          <div className="space-y-3">
            {DEPLOYED_CONTRACTS.map((contract, index) => (
              <div 
                key={index}
                className={`p-3 border rounded cursor-pointer transition-colors ${
                  selectedContract === contract ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleContractSelect(contract)}
              >
                <h3 className="font-medium">{contract.name}</h3>
                <p className="text-sm text-gray-600">
                  {contract.network} · {contract.date} · 
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
                value={selectedFunction.name}
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
              Execute {selectedFunction.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 