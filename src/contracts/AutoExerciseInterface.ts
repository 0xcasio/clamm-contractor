// AutoExerciseInterface.ts
// Interface representing the Stryke CLAMM AutoExercise contract

export interface AutoExerciseParams {
  optionMarket: string; // address
  optionId: string; // BigNumber as string
  swapper: string[]; // addresses
  swapData: string[]; // bytes
  liquidityToExercise: string[]; // BigNumber as string
  minReturnPerLiquidity: string[]; // BigNumber as string
  executorFee: string; // BigNumber as string
}

// This interface represents the main functions of the AutoExerciseTimeBased contract
export interface AutoExerciseInterface {
  // Main function
  autoExercise: (params: AutoExerciseParams) => Promise<any>;
  
  // Admin functions
  grantRole: (role: string, account: string) => Promise<any>;
  revokeRole: (role: string, account: string) => Promise<any>;
  
  // View functions
  hasRole: (role: string, account: string) => Promise<boolean>;
  
  // Constants
  DEFAULT_ADMIN_ROLE: () => Promise<string>;
  EXECUTOR_ROLE: () => Promise<string>;
} 