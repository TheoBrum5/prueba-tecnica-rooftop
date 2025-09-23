import React from 'react';

interface ActionButtonsProps {
  showSuccess: boolean;
  showError: boolean;
  showClear: boolean;
  onClear: () => void;
  disabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  showSuccess,
  showError,
  showClear,
  onClear,
  disabled
}) => {
  return (
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
      {showError && (
        <div className="text-red-500" title="Error de validación">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      )}
      
      {showSuccess && (
        <div className="text-green-500" title="Búsqueda válida">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {showClear && (
        <button
          onClick={onClear}
          disabled={disabled}
          className="text-gray-400 hover:text-gray-600 focus:outline-none disabled:cursor-not-allowed"
          aria-label="Limpiar búsqueda"
          title="Limpiar búsqueda"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ActionButtons;