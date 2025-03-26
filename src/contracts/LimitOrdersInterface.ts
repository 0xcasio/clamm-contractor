// LimitOrdersInterface.ts
// Interface representing the Stryke CLAMM LimitOrders contract

export interface Order {
  createdAt: string; // BigNumber as string
  deadline: string; // BigNumber as string
  maker: string; // address
  validator: string; // address
  flags: number;
  data: string; // bytes
}

export interface Signature {
  v: number;
  r: string; // bytes32
  s: string; // bytes32
}

export interface BlockTradeOrder {
  token: string; // address
  optionMarket: string; // address
  tokenId: string; // BigNumber as string
  payment: string; // BigNumber as string
  taker: string; // address
}

export interface PurchaseOrder {
  token: string; // address
  optionMarket: string; // address
  isCall: boolean;
  strike: string; // BigNumber as string
  payment: string; // BigNumber as string
  maker: string; // address
}

// This interface represents the main functions of the LimitOrders contract
export interface LimitOrdersInterface {
  // Main order functions
  fillOffer: (order: Order, signature: Signature) => Promise<any>;
  matchOrders: (
    makerOrder: Order, 
    takerOrder: Order, 
    makerSignature: Signature, 
    takerSignature: Signature
  ) => Promise<any>;
  
  // Order verification
  isOrderCancelled: (orderHash: string) => Promise<boolean>;
  
  // Order management
  cancelOrder: (order: Order) => Promise<any>;
} 