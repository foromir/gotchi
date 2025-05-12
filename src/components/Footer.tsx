"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6">
            {/* Twitter/X Link */}
            <Link
              href="https://x.com/tamagotchi_hl"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <Image 
                src="/x.svg" 
                alt="X (Twitter)" 
                width={24} 
                height={24} 
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-sm font-medium">Follow us on X</span>
            </Link>

            {/* Token Link */}
            <Link
              href="https://liquidlaunch.app/token/0xa4a527a20287057556809b63b32c3a6a6f796872"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-[#4697ff] rounded-full group-hover:scale-110 transition-transform duration-300">
               <Image 
                src="/Logo_1.webp" 
                alt="Token" 
                width={24} 
                height={24} 
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
              />
              </div>
              <span className="text-sm font-medium">View Token GOTCHI</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Tamagotchi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 