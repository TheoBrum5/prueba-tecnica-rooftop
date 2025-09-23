import React from 'react';

interface ValidationMessageProps {
  message: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ message }) => {
  return (
    <div className="mt-1 flex items-center">
      <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <p className="text-sm text-red-600" style={{fontFamily: 'Arial, sans-serif'}}>
        {message}
      </p>
    </div>
  );
};

export default ValidationMessage;