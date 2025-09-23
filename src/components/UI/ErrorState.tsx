import React from 'react';
import { UI_TEXT, ERROR_MESSAGES } from '../../constants';

interface ErrorStateProps {
  error?: Error | null;
  onRetry?: () => void;
  title?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  error,
  onRetry,
  title = 'USUARIOS'
}) => {
  const errorMessage = error?.message || ERROR_MESSAGES.API.CONNECTION;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
            {title}
          </h2>
        </div>
        <div className="bg-white shadow-sm overflow-hidden border border-gray-200 p-8">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{fontFamily: 'Arial, sans-serif'}}>
              {ERROR_MESSAGES.API.FETCH_USERS}
            </h3>
            <p className="text-gray-600 mb-4" style={{fontFamily: 'Arial, sans-serif'}}>
              {errorMessage}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                {UI_TEXT.BUTTONS.RETRY}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorState;