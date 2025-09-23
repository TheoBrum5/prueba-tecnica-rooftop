import React from 'react';
import { SEARCH_CONFIG } from '../../constants';

interface HelpTextProps {
  isVisible: boolean;
}

const HelpText: React.FC<HelpTextProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="mt-1">
      <p className="text-xs text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
        Busca por nombre (mínimo {SEARCH_CONFIG.MIN_LENGTH} caracteres). Solo letras, espacios, guiones y puntos.
      </p>
    </div>
  );
};

export default HelpText;