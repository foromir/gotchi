"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TamagotchiSpriteProps {
  isSleeping: boolean;
  hunger: number;
  happiness: number;
  energy: number;
  onInteraction: () => void;
}

const TamagotchiSprite: React.FC<TamagotchiSpriteProps> = ({
  isSleeping,
  hunger,
  happiness,
  energy,
  onInteraction,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [spriteState, setSpriteState] = useState<'idle' | 'happy' | 'eating' | 'sleeping'>('idle');

  // Determine the sprite state based on conditions
  useEffect(() => {
    if (isSleeping) {
      setSpriteState('sleeping');
    } else if (isAnimating) {
      // Keep current animation state
    } else if (hunger < 20) {
      setSpriteState('idle');
    } else if (happiness > 80) {
      setSpriteState('happy');
    } else {
      setSpriteState('idle');
    }
  }, [isSleeping, hunger, happiness, isAnimating]);

  const handleClick = () => {
    if (isSleeping) return;
    
    setIsAnimating(true);
    setSpriteState('happy');
    onInteraction();
    
    // Reset animation after 1 second
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const getSpriteGif = () => {
    switch (spriteState) {
      case 'sleeping':
        return '/emojis/1839-pixel-emoji-money-eyes-anim.gif';
      case 'happy':
        return '/emojis/6056-pixel-emoji-twinkling-heart-eyes.gif';
      case 'eating':
        return '/emojis/1839-pixel-emoji-money-eyes-anim.gif';
      case 'idle':
      default:
        if (hunger < 20) return '/emojis/8465-pixel-emoji-surprised-anim.gif';
        if (happiness < 20) return '/emojis/8616-pixel-emoji-sob-anim.gif';
        if (energy < 20) return '/emojis/7925-pixel-emoji-cry-anim.gif';
        return '/emojis/1885-pixel-emoji-winks-anim.gif';
    }
  };

  const getSpriteStyle = () => {
    const baseStyle = "transition-all duration-300 transform cursor-pointer select-none";
    const hoverStyle = !isSleeping ? "hover:scale-110 active:scale-95" : "";
    const animationStyle = isAnimating ? "animate-bounce" : "";
    
    return `${baseStyle} ${hoverStyle} ${animationStyle}`;
  };

  return (
    <div 
      className="relative group"
      onClick={handleClick}
    >
      <div className={getSpriteStyle() + "mx-auto"}>
        <Image
          src={getSpriteGif()}
          alt="Tamagotchi"
          width={120}
          height={120}
          className="object-contain mx-auto"
        />
      </div>
      
      {/* Interaction hint */}
      {!isSleeping && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                      opacity-0 group-hover:opacity-100 transition-opacity
                      text-sm text-white bg-black/50 px-2 py-1 rounded-full">
          Click to interact!
        </div>
      )}

      {/* Status indicators */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-1">
        {hunger < 20 && (
          <span className="text-sm bg-yellow-500/80 text-white px-2 py-0.5 rounded-full">Hungry</span>
        )}
        {happiness < 20 && (
          <span className="text-sm bg-pink-500/80 text-white px-2 py-0.5 rounded-full">Sad</span>
        )}
        {energy < 20 && !isSleeping && (
          <span className="text-sm bg-blue-500/80 text-white px-2 py-0.5 rounded-full">Tired</span>
        )}
      </div>
    </div>
  );
};

export default TamagotchiSprite; 