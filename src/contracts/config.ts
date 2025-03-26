// config.ts
// Contract configuration for the CLAMM contract dashboard

import { OptionMarketConstructorParams } from './OptionMarketV2Interface';
import { LiquidityHandlerConstructorParams } from './LiquidityHandlerV2Interface';
import { OptionPricingConstructorParams } from './OptionPricingV2Interface';

// Contract addresses
export const CONTRACT_ADDRESSES = {
  // Core contracts
  optionMarket: '0x0000000000000000000000000000000000000000', // Replace with actual address
  positionManager: '0x0000000000000000000000000000000000000000', // Replace with actual address
  liquidityHandler: '0x0000000000000000000000000000000000000000', // Replace with actual address
  optionPricing: '0x0000000000000000000000000000000000000000', // Replace with actual address
  
  // Peripheral contracts
  autoExercise: '0x0000000000000000000000000000000000000000', // Replace with actual address
  limitOrders: '0x0000000000000000000000000000000000000000', // Replace with actual address
  
  // External contracts
  uniswapFactory: '0x1F98431c8aD98523631AE4a59f267346ea31F984', // Uniswap V3 Factory
  swapRouter: '0xE592427A0AEce92De3Edee1F18E0157C05861564', // Uniswap V3 Router
};

// OptionMarket constructor parameters
export const OPTION_MARKET_PARAMS: OptionMarketConstructorParams = {
  positionManager: CONTRACT_ADDRESSES.positionManager,
  optionPricing: CONTRACT_ADDRESSES.optionPricing,
  dpFee: '0x0000000000000000000000000000000000000000', // Fee strategy contract
  callAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  putAsset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  primePool: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640', // USDC/WETH 0.05% pool
};

// LiquidityHandler constructor parameters
export const LIQUIDITY_HANDLER_PARAMS: LiquidityHandlerConstructorParams = {
  factory: CONTRACT_ADDRESSES.uniswapFactory,
  pool_init_code_hash: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54', // Uniswap V3 pool init code hash
  swapRouter: CONTRACT_ADDRESSES.swapRouter,
};

// OptionPricing constructor parameters
export const OPTION_PRICING_PARAMS: OptionPricingConstructorParams = {
  minOptionPricePercentage: '100', // 1% (in basis points)
  xSyk: '0x0000000000000000000000000000000000000000', // Replace with actual address
};

// TTL options for options (in seconds)
export const TTL_OPTIONS = [
  { label: '1 day', value: 86400 },
  { label: '1 week', value: 604800 },
  { label: '2 weeks', value: 1209600 },
  { label: '1 month', value: 2592000 },
];

// Common token pairs for option markets
export const TOKEN_PAIRS = [
  { 
    name: 'ETH/USDC', 
    callAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 
    putAsset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    pool: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
    callDecimals: 18,
    putDecimals: 6
  },
  { 
    name: 'BTC/USDC', 
    callAsset: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 
    putAsset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    pool: '0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35',
    callDecimals: 8,
    putDecimals: 6
  },
];

// Valid tick ranges for different fee tiers
export const TICK_RANGES = {
  100: [10, 20, 50], // 0.01% fee tier
  500: [10, 50, 100], // 0.05% fee tier
  3000: [50, 100, 200], // 0.3% fee tier
  10000: [200, 500, 1000], // 1% fee tier
}; 