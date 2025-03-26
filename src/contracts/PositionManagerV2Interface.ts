// PositionManagerV2Interface.ts
// Interface representing the Stryke CLAMM PositionManager contract

export interface MintPositionParams {
  handler: string; // address
  mintPositionData: string; // bytes
}

export interface BurnPositionParams {
  handler: string; // address
  burnPositionData: string; // bytes
}

export interface UsePositionParams {
  handler: string; // address
  usePositionData: string; // bytes
}

export interface UnusePositionParams {
  handler: string; // address
  unusePositionData: string; // bytes
}

export interface DonateToPositionParams {
  handler: string; // address
  donatePositionData: string; // bytes
}

export interface ReserveLiquidityParams {
  handler: string; // address
  reserveLiquidityData: string; // bytes
}

export interface WithdrawReserveLiquidityParams {
  handler: string; // address
  withdrawReserveLiquidityData: string; // bytes
}

// This interface represents the main functions of the DopexV2PositionManagerV2 contract
export interface PositionManagerInterface {
  // Main position management functions
  mintPosition: (params: MintPositionParams) => Promise<any>;
  burnPosition: (params: BurnPositionParams) => Promise<any>;
  usePosition: (params: UsePositionParams) => Promise<any>;
  unusePosition: (params: UnusePositionParams) => Promise<any>;
  donateToPosition: (params: DonateToPositionParams) => Promise<any>;
  
  // Liquidity reservation functions
  reserveLiquidity: (params: ReserveLiquidityParams) => Promise<any>;
  withdrawReserveLiquidity: (params: WithdrawReserveLiquidityParams) => Promise<any>;
  
  // Admin functions
  updateWhitelistHandlerWithApp: (handler: string, app: string, status: boolean) => Promise<any>;
  updateWhitelistHandler: (handler: string, status: boolean) => Promise<any>;
} 