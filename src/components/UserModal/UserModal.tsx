import React, { useEffect } from 'react';
import { useUser } from '../../hooks/useUsers';
import { LoadingSpinner, ErrorState } from '../UI';
import { ERROR_MESSAGES, UI_TEXT, MODAL_CONFIG } from '../../constants';
import ModalHeader from './ModalHeader';
import UserBasicInfo from './UserBasicInfo';
import UserDetailsList from './UserDetailsList';
import ModalFooter from './ModalFooter';

interface UserModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ userId, isOpen, onClose }) => {
  const { data: user, isLoading, isError, error } = useUser(userId);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 overflow-y-auto"
        style={{ maxHeight: MODAL_CONFIG.MAX_HEIGHT }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader onClose={onClose} />

        <div className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
              <span className="ml-3 text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>
                {UI_TEXT.LOADING.DETAILS}
              </span>
            </div>
          )}

          {isError && (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2" style={{fontFamily: 'Arial, sans-serif'}}>
                Error al cargar detalles
              </h3>
              <p className="text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>
                {error?.message || ERROR_MESSAGES.API.FETCH_USER_DETAILS}
              </p>
            </div>
          )}

          {user && (
            <div className="space-y-6">
              <UserBasicInfo user={user} />
              <UserDetailsList user={user} />
            </div>
          )}
        </div>

        <ModalFooter onClose={onClose} />
      </div>
    </div>
  );
};

export default UserModal;