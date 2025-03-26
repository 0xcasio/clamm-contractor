// OptionMarketV2Interface.ts
// Interface representing the Stryke CLAMM OptionMarket contract

export interface OptionParams {
  optionTicks: OptionTicks[];
  tickLower: number;
  tickUpper: number;
  ttl: number;
  isCall: boolean;
  maxCostAllowance: string; // BigNumber as string
}

export interface OptionTicks {
  handler: string; // address
  pool: string; // address
  hook: string; // address
  tickLower: number;
  tickUpper: number;
  liquidityToUse: string; // BigNumber as string
}

export interface ExerciseOptionParams {
  optionId: string; // BigNumber as string
  swapper: string[]; // addresses
  swapData: string[]; // bytes
  liquidityToExercise: string[]; // BigNumber as string
}

export interface SettleOptionParams {
  optionId: string; // BigNumber as string
  swapper: string[]; // addresses
  swapData: string[]; // bytes
  liquidityToSettle: string[]; // BigNumber as string
}

export interface OptionMarketConstructorParams {
  positionManager: string; // address
  optionPricing: string; // address
  dpFee: string; // address
  callAsset: string; // address
  putAsset: string; // address
  primePool: string; // address
}

// This interface represents the main functions of the DopexV2OptionMarketV2 contract
export interface OptionMarketInterface {
  // Main functions
  mintOption: (params: OptionParams) => Promise<any>;
  exerciseOption: (params: ExerciseOptionParams) => Promise<any>;
  settleOption: (params: SettleOptionParams) => Promise<any>;
  
  // View functions to get option data
  opData: (optionId: string) => Promise<any>;
  opTickMap: (optionId: string, tickIndex: number) => Promise<any>;
  
  // Ownable functions
  transferOwnership: (newOwner: string) => Promise<any>;
  owner: () => Promise<string>;
} 