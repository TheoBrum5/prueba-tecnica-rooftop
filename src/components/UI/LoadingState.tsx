import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { UI_TEXT } from '../../constants';

interface LoadingStateProps {
  message?: string;
  title?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = UI_TEXT.LOADING.USERS,
  title = 'USUARIOS'
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
            {title}
          </h2>
        </div>
        <div className="bg-white shadow-sm overflow-hidden border border-gray-200 p-8">
          <div className="flex items-center justify-center">
            <LoadingSpinner />
            <span className="ml-3 text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>
              {message}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingState;