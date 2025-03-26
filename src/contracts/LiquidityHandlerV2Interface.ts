// LiquidityHandlerV2Interface.ts
// Interface representing the Stryke CLAMM Liquidity Handler contract

export interface HandlerMintPositionParams {
  pool: string; // address
  hook: string; // address
  tickLower: number;
  tickUpper: number;
  liquidity: string; // BigNumber as string
}

export interface HandlerBurnPositionParams {
  pool: string; // address
  hook: string; // address
  tickLower: number;
  tickUpper: number;
  shares: string; // BigNumber as string
}

export interface HandlerUsePositionParams {
  pool: string; // address
  hook: string; // address
  tickLower: number;
  tickUpper: number;
  liquidityToUse: string; // BigNumber as string
}

export interface HandlerUnusePositionParams {
  pool: string; // address
  hook: string; // address
  tickLower: number;
  tickUpper: number;
  liquidityToUnuse: string; // BigNumber as string
}

export interface DonateParams {
  pool: string; // address
  hook: string; // address
  tickLower: number;
  tickUpper: number;
  liquidityToDonate: string; // BigNumber as string
}

export interface HandlerReserveLiquidityParams {
  liquidity: string; // BigNumber as string
  lastReserve: number;
}

export interface LiquidityHandlerConstructorParams {
  factory: string; // address
  pool_init_code_hash: string; // bytes32
  swapRouter: string; // address
}

// This interface represents the main functions of the UniswapV3SingleTickLiquidityHandlerV2 contract
export interface LiquidityHandlerInterface {
  // Main functions that are called through the PositionManager
  mintPositionHandler: (context: string, mintPositionData: string) => Promise<any>;
  burnPositionHandler: (context: string, burnPositionData: string) => Promise<any>;
  usePositionHandler: (context: string, usePositionData: string) => Promise<any>;
  unusePositionHandler: (context: string, unusePositionData: string) => Promise<any>;
  donateToPositionHandler: (context: string, donatePositionData: string) => Promise<any>;
  reserveLiquidity: (context: string, reserveLiquidityData: string) => Promise<any>;
  withdrawReserveLiquidity: (context: string, withdrawReserveLiquidityData: string) => Promise<any>;
  
  // View functions
  getTokenIdInfo: (tokenId: string) => Promise<any>;
  balanceOf: (account: string, id: string) => Promise<any>;
}