"use client";

import React from 'react';
import { useWallet } from '@/context/WalletContext';

const Header: React.FC = () => {
  const { account, balance, isConnected, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="fixed top-0 left-0 right-0 z-50  backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">

          <h1 className="text-2xl font-bold mb-4 drop-shadow-lg whitespace-nowrap bg-gradient-to-r from-[#4697ff] via-purple-500 to-[#4697ff] bg-clip-text text-transparent animate-gradient">
              
            <a 
                    href="https://liquidlaunch.app/token/0xa4a527a20287057556809b63b32c3a6a6f796872"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌟 GOTCHI
                  </a></h1>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded-full">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full">
                    {balance} ETH
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-[#4697ff] text-white rounded-lg hover:bg-[#3a7fd9] transition-colors text-sm flex items-center space-x-2"
              >
                <span>Connect Wallet</span>
                <img src="/metamask.webp" alt="MetaMask" className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Wallet Info */}
      {isConnected && (
        <div className="md:hidden bg-gray-50 px-4 py-2 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{account?.slice(0, 6)}...{account?.slice(-4)}</span>
            <span>{balance} ETH</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 