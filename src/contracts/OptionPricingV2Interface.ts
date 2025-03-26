// OptionPricingV2Interface.ts
// Interface representing the Stryke CLAMM Option Pricing contract

export interface OptionPricingConstructorParams {
  minOptionPricePercentage: string; // BigNumber as string
  xSyk: string; // address
}

// This interface represents the main functions of the OptionPricingLinearV2_1 contract
export interface OptionPricingInterface {
  // Main pricing function
  getPremium: (
    strikePriceX96: string, 
    spotPriceX96: string, 
    timeToExpiry: number, 
    tickLower: number,
    tickUpper: number,
    isCall: boolean
  ) => Promise<string>; // Returns premium amount as string

  // Admin functions
  updateIVSetter: (setter: string, status: boolean) => Promise<any>;
  updateImpliedVolatilityBPS: (ttl: number, ivBps: string) => Promise<any>;
  updateMinOptionPricePercentage: (percentage: string) => Promise<any>;
  
  // View functions
  ivSetters: (setter: string) => Promise<boolean>;
  minOptionPricePercentage: () => Promise<string>;
  ttlToIvBps: (ttl: number) => Promise<string>;
} 