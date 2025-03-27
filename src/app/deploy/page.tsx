'use client';

import React, { useState, useEffect } from 'react';
import { 
  TOKEN_PAIRS, 
  TTL_OPTIONS, 
  OPTION_MARKET_PARAMS,
  LIQUIDITY_HANDLER_PARAMS,
  OPTION_PRICING_PARAMS,
  TICK_RANGES
} from '@/contracts';
import { useNetwork } from '@/contexts/NetworkContext';

export default function DeployPage() {
  // Get network context
  const { selectedNetwork } = useNetwork();
  
  // Contract selection state
  const [selectedContract, setSelectedContract] = useState('OptionMarket');
  
  // Form state
  const [formState, setFormState] = useState({
    // General
    deploymentName: '',
    
    // OptionMarket params
    positionManager: OPTION_MARKET_PARAMS.positionManager,
    optionPricing: OPTION_MARKET_PARAMS.optionPricing,
    dpFee: OPTION_MARKET_PARAMS.dpFee,
    tokenPair: TOKEN_PAIRS[0].name, // ETH/USDC by default
    callAsset: OPTION_MARKET_PARAMS.callAsset,
    putAsset: OPTION_MARKET_PARAMS.putAsset,
    primePool: OPTION_MARKET_PARAMS.primePool,
    
    // LiquidityHandler params
    factory: LIQUIDITY_HANDLER_PARAMS.factory,
    pool_init_code_hash: LIQUIDITY_HANDLER_PARAMS.pool_init_code_hash,
    swapRouter: LIQUIDITY_HANDLER_PARAMS.swapRouter,
    
    // OptionPricing params
    minOptionPricePercentage: OPTION_PRICING_PARAMS.minOptionPricePercentage,
    xSyk: OPTION_PRICING_PARAMS.xSyk,
    
    // AutoExercise params
    autoExerciseFee: '0.05', // Default 0.05 ETH
  });

  // Update deployment name when network changes
  useEffect(() => {
    if (formState.deploymentName === '') {
      setFormState(prev => ({
        ...prev,
        deploymentName: `${TOKEN_PAIRS[0].name} on ${selectedNetwork.name}`
      }));
    }
  }, [selectedNetwork, formState.deploymentName]);
  
  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle token pair selection
    if (name === 'tokenPair') {
      const selectedPair = TOKEN_PAIRS.find(pair => pair.name === value);
      if (selectedPair) {
        setFormState({
          ...formState,
          tokenPair: value,
          callAsset: selectedPair.callAsset,
          putAsset: selectedPair.putAsset,
          primePool: selectedPair.pool,
          // Update deployment name with new token pair
          deploymentName: `${value} on ${selectedNetwork.name}`
        });
      }
      return;
    }
    
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  // Handle contract selection
  const handleContractSelect = (contractName: string) => {
    setSelectedContract(contractName);
  };
  
  // Handle deploy button click
  const handleDeploy = () => {
    console.log(`Deploying ${selectedContract} on ${selectedNetwork.name} (Chain ID: ${selectedNetwork.chainId}) with params:`, formState);
    // Here we would actually call a function to deploy the contract
    alert(`Deploy data logged to console. In a real app, this would deploy the ${selectedContract} contract on ${selectedNetwork.name}.`);
  };

  // Render parameters based on selected contract
  const renderParameters = () => {
    switch (selectedContract) {
      case 'OptionMarket':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Token Pair</label>
              <select 
                name="tokenPair" 
                value={formState.tokenPair} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                {TOKEN_PAIRS.map(pair => (
                  <option key={pair.name} value={pair.name}>{pair.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Position Manager</label>
              <input 
                type="text" 
                name="positionManager"
                value={formState.positionManager} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="0x..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Option Pricing</label>
              <input 
                type="text" 
                name="optionPricing"
                value={formState.optionPricing} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="0x..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fee Strategy</label>
              <input 
                type="text" 
                name="dpFee"
                value={formState.dpFee} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="0x..."
              />
            </div>
          </>
        );
        
      case 'PositionManager':
        return (
          <div className="text-sm text-gray-500">
            Position Manager contract has no constructor parameters. It can be deployed directly.
          </div>
        );
        
      case 'LiquidityHandler':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Factory Address</label>
              <input 
                type="text" 
                name="factory"
                value={formState.factory} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="0x..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Pool Init Code Hash</label>
              <input 
                type="text" 
                name="pool_init_code_hash"
                value={formState.pool_init_code_hash} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="0x..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Swap Router</label>
              <input 
                type="text" 
                name="swapRouter"
                value={formState.swapRouter} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="0x..."
              />
            </div>
          </>
        );
        
      case 'OptionPricing':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Min Option Price Percentage (bps)</label>
              <input 
                type="text" 
                name="minOptionPricePercentage"
                value={formState.minOptionPricePercentage} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">xSyk Address</label>
              <input 
                type="text" 
                name="xSyk"
                value={formState.xSyk} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="0x..."
              />
            </div>
          </>
        );
        
      case 'AutoExercise':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Default Executor Fee (ETH)</label>
            <input 
              type="text" 
              name="autoExerciseFee"
              value={formState.autoExerciseFee} 
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="0.05"
            />
          </div>
        );
        
      case 'LimitOrders':
        return (
          <div className="text-sm text-gray-500">
            Limit Orders contract has no constructor parameters. It can be deployed directly.
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">CLAMM Contract Dashboard - Deploy</h1>
      <p className="mb-6">Deploy CLAMM contracts with custom parameters for your DeFi options platform.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contract Selection</h2>
          <ul className="space-y-2">
            <li 
              className={`p-3 rounded cursor-pointer ${selectedContract === 'OptionMarket' ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleContractSelect('OptionMarket')}
            >
              DopexV2OptionMarketV2
            </li>
            <li 
              className={`p-3 rounded cursor-pointer ${selectedContract === 'PositionManager' ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleContractSelect('PositionManager')}
            >
              DopexV2PositionManagerV2
            </li>
            <li 
              className={`p-3 rounded cursor-pointer ${selectedContract === 'LiquidityHandler' ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleContractSelect('LiquidityHandler')}
            >
              UniswapV3SingleTickLiquidityHandlerV2
            </li>
            <li 
              className={`p-3 rounded cursor-pointer ${selectedContract === 'OptionPricing' ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleContractSelect('OptionPricing')}
            >
              OptionPricingLinearV2_1
            </li>
            <li 
              className={`p-3 rounded cursor-pointer ${selectedContract === 'AutoExercise' ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleContractSelect('AutoExercise')}
            >
              AutoExerciseTimeBased
            </li>
            <li 
              className={`p-3 rounded cursor-pointer ${selectedContract === 'LimitOrders' ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleContractSelect('LimitOrders')}
            >
              LimitOrders
            </li>
          </ul>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Deployment Name</label>
              <input 
                type="text" 
                name="deploymentName"
                value={formState.deploymentName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded" 
                placeholder="ETH/USDC Options Market"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Network</label>
              <div className="p-2 bg-gray-100 rounded flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium">{selectedNetwork.name}</span>
                <span className="text-xs text-gray-500">Chain ID: {selectedNetwork.chainId}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">To change the network, use the network selector in the header.</p>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-3">Contract Parameters</h3>
              <div className="space-y-4">
                {renderParameters()}
              </div>
            </div>
            
            <button 
              onClick={handleDeploy}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Deploy {selectedContract} on {selectedNetwork.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 