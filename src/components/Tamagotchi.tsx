"use client";

import React, { useEffect, useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import TamagotchiSprite from './TamagotchiSprite';

interface TamagotchiStats {
  hunger: number;
  happiness: number;
  energy: number;
  lastUpdated: number;
}

const MAX_STAT = 100;
const DECREASE_RATE = 0.5; // Stats decrease by 0.5 every second
const UPDATE_INTERVAL = 1000; // Update every second

const Tamagotchi: React.FC = () => {
  const { isConnected, account } = useWallet();
  const [stats, setStats] = useState<TamagotchiStats>({
    hunger: 100,
    happiness: 100,
    energy: 100,
    lastUpdated: Date.now(),
  });
  const [isSleeping, setIsSleeping] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  // Update stats over time
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setStats(prevStats => {
        const now = Date.now();
        const timePassed = (now - prevStats.lastUpdated) / 1000; // Convert to seconds
        const decrease = DECREASE_RATE * timePassed;

        return {
          hunger: Math.max(0, prevStats.hunger - decrease),
          happiness: Math.max(0, prevStats.happiness - decrease),
          energy: isSleeping 
            ? Math.min(MAX_STAT, prevStats.energy + decrease * 2) // Energy increases faster while sleeping
            : Math.max(0, prevStats.energy - decrease),
          lastUpdated: now,
        };
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isConnected, isSleeping]);

  const handleInteraction = () => {
    setInteractionCount(prev => prev + 1);
    setStats(prev => ({
      ...prev,
      happiness: Math.min(MAX_STAT, prev.happiness + 5),
    }));
  };

  const feed = () => {
    setStats(prev => ({
      ...prev,
      hunger: Math.min(MAX_STAT, prev.hunger + 20),
      energy: Math.min(MAX_STAT, prev.energy + 10),
    }));
  };

  const play = () => {
    setStats(prev => ({
      ...prev,
      happiness: Math.min(MAX_STAT, prev.happiness + 20),
      energy: Math.max(0, prev.energy - 15),
    }));
  };

  const toggleSleep = () => {
    setIsSleeping(!isSleeping);
  };

  if (!isConnected) {
    return (
      <div className="Tamagotchi w-[400px] p-6 mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-md text-center">
        <p className="text-gray-600">Connect your wallet to adopt a Tamagotchi!</p>
      </div>
    );
  }

  return (
    <div className="Tamagotchi w-[400px] p-6 mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
      <div className="text-center mb-6">
        <TamagotchiSprite
          isSleeping={isSleeping}
          hunger={stats.hunger}
          happiness={stats.happiness}
          energy={stats.energy}
          onInteraction={handleInteraction}
        />
        <h2 className="text-xl font-bold text-[#4697ff] mt-8 mb-2"> Owner: {account?.slice(0, 6)}...{account?.slice(-4)}</h2>
        <p className="text-sm text-gray-500 mt-2">
          Interactions: {interactionCount}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Hunger</span>
            <span>{Math.round(stats.hunger)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.hunger}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Happiness</span>
            <span>{Math.round(stats.happiness)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.happiness}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Energy</span>
            <span>{Math.round(stats.energy)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.energy}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <button
          onClick={feed}
          disabled={isSleeping}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Feed
        </button>
        <button
          onClick={play}
          disabled={isSleeping}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Play
        </button>
        <button
          onClick={toggleSleep}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors cursor-pointer"
        >
          {isSleeping ? 'Wake Up' : 'Sleep'}
        </button>
      </div>
    </div>
  );
};

export default Tamagotchi; 