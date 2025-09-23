import React from 'react';
import { UI_TEXT } from '../../constants';

interface ModalHeaderProps {
  onClose: () => void;
  title?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ 
  onClose, 
  title = 'Detalles del Usuario' 
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
        {title}
      </h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
        aria-label="Cerrar modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default ModalHeader;