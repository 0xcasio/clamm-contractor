import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">CLAMM Contract Dashboard</h1>
      <p className="mb-6">Deploy and manage CLAMM smart contracts across multiple EVM-compatible blockchains.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href="/deploy" 
          className="block border p-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Deploy Contracts</h2>
          <p className="text-gray-600 mb-4">
            Deploy new CLAMM markets and contracts in a step-by-step process
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500">
            <li>Configure contract parameters</li>
            <li>Deploy in correct order</li>
            <li>Track deployment progress</li>
          </ul>
        </a>
        
        <a 
          href="/modify" 
          className="block border p-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Modify Contracts</h2>
          <p className="text-gray-600 mb-4">
            Update parameters of deployed contracts
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500">
            <li>Execute contract functions</li>
            <li>Update whitelist settings</li>
            <li>Modify pricing parameters</li>
          </ul>
        </a>
      </div>
      
      <div className="mt-12 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">About This Dashboard</h2>
        <p className="mb-4">
          The CLAMM Contract Dashboard is designed to streamline the deployment and management of CLAMM (Cross-chain Liquidity Automated Market Maker) smart contracts across multiple EVM-compatible blockchains.
        </p>
        <p>
          This tool enables developers and administrators to deploy new CLAMM markets and modify existing contract parameters through an intuitive user interface, eliminating the need for manual contract deployment and reducing the potential for configuration errors.
        </p>
      </div>
    </div>
  );
}
