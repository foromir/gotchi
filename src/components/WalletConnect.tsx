"use client";

import React from 'react';
import { useWallet } from '@/context/WalletContext';

const WalletConnect: React.FC = () => {
  const { account, balance, isConnected, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="p-6 max-w-sm mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-md flex flex-col items-center space-y-4">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Connect MetaMask
        </button>
      ) : (
        <div className="w-full space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">Wallet Connected</h2>
            <p className="text-sm text-gray-600 break-all mt-2">
              Account: {account}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Balance: {balance} ETH
            </p>
          </div>
          <button
            onClick={disconnectWallet}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 