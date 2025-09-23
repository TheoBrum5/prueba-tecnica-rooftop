import React from 'react';

interface CharacterCounterProps {
  current: number;
  max: number;
  threshold: number;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({ current, max, threshold }) => {
  if (current <= threshold) return null;

  return (
    <div className="mt-1 text-right">
      <span 
        className={`text-xs ${current > max - 5 ? 'text-red-500' : 'text-gray-500'}`} 
        style={{fontFamily: 'Arial, sans-serif'}}
      >
        {current}/{max}
      </span>
    </div>
  );
};

export default CharacterCounter;