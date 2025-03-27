import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Stryke CLAMM Contract Dashboard</h1>
      <p className="mb-8 text-lg text-gray-700">
        Deploy and manage Stryke Concentrated Liquidity Automated Market Maker (CLAMM) option contracts across multiple EVM-compatible blockchains.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link 
          href="/deploy" 
          className="block border p-6 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-3">Deploy Contracts</h2>
          <p className="text-gray-600 mb-4">
            Deploy new Stryke CLAMM option markets and contracts in a step-by-step process
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
            <li>Configure contract parameters</li>
            <li>Deploy contracts in the correct order</li>
            <li>Set up option markets with custom parameters</li>
            <li>Track deployment progress</li>
          </ul>
        </Link>
        
        <Link 
          href="/modify" 
          className="block border p-6 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-3">Modify Contracts</h2>
          <p className="text-gray-600 mb-4">
            Update parameters of deployed contracts and execute functions
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
            <li>Mint, exercise and settle options</li>
            <li>Manage liquidity positions</li>
            <li>Update IV and pricing parameters</li>
            <li>Configure auto-exercise settings</li>
          </ul>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">Core Contracts</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="p-3 border rounded bg-gray-50">
                <div className="font-medium">DopexV2OptionMarketV2</div>
                <p className="text-sm text-gray-600 mt-1">
                  Allows traders to buy CALL and PUT options using CLAMM liquidity, which can be exercised at any time when in-the-money
                </p>
              </li>
              <li className="p-3 border rounded bg-gray-50">
                <div className="font-medium">DopexV2PositionManagerV2</div>
                <p className="text-sm text-gray-600 mt-1">
                  Entry point for liquidity managers and applications, handling position creation and management
                </p>
              </li>
              <li className="p-3 border rounded bg-gray-50">
                <div className="font-medium">UniswapV3SingleTickLiquidityHandlerV2</div>
                <p className="text-sm text-gray-600 mt-1">
                  Handler for providing liquidity for Uniswap V3 style AMMs, supporting reserved liquidity and hooks
                </p>
              </li>
              <li className="p-3 border rounded bg-gray-50">
                <div className="font-medium">OptionPricingLinearV2_1</div>
                <p className="text-sm text-gray-600 mt-1">
                  Handles option pricing calculations using implied volatility and time to expiration
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-green-600 text-white p-4">
            <h2 className="text-xl font-semibold">Peripheral Contracts</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="p-3 border rounded bg-gray-50">
                <div className="font-medium">AutoExerciseTimeBased</div>
                <p className="text-sm text-gray-600 mt-1">
                  Enables automatic exercise of options based on time and profit conditions
                </p>
              </li>
              <li className="p-3 border rounded bg-gray-50">
                <div className="font-medium">LimitOrders</div>
                <p className="text-sm text-gray-600 mt-1">
                  Facilitates off-chain order creation and matching for options
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
