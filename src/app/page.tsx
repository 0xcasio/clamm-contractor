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
      
      <div className="mt-8 p-6 border rounded-lg bg-gray-50 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">About Stryke CLAMM</h2>
        <p className="mb-4 text-gray-700">
          Stryke CLAMM (Concentrated Liquidity Automated Market Maker) is a DeFi options protocol built on top of Uniswap V3 that enables the creation and trading of on-chain options.
        </p>
        <p className="mb-4 text-gray-700">
          The protocol uses liquidity from Uniswap V3 style AMMs to create options markets, allowing traders to buy CALL and PUT options that can be exercised at any time when in-the-money. Liquidity providers can supply concentrated liquidity to earn fees from option premiums.
        </p>
        <p className="text-gray-700">
          This dashboard allows for seamless deployment and management of the Stryke CLAMM contracts, providing an intuitive interface for interacting with the full suite of contracts in the ecosystem.
        </p>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          <strong>Note:</strong> For technical documentation and detailed information about the contracts, please visit the{" "}
          <a 
            href="https://github.com/stryke-xyz/clamm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Stryke CLAMM GitHub repository
          </a>.
        </div>
      </div>
    </div>
  );
}
