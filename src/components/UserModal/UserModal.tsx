// src/components/UserModal/UserModal.tsx

import React, { useEffect } from 'react';
import { useUser } from '../../hooks/useUsers';

interface UserModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ userId, isOpen, onClose }) => {
  // Hook de React Query para obtener detalles del usuario
  const { data: user, isLoading, isError, error } = useUser(userId);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // No renderizar nada si el modal está cerrado
  if (!isOpen) return null;

  // Formatear fecha de nacimiento
  const formatBirthDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric'
      });
    } catch {
      return dateString; // Fallback si hay error
    }
  };

  // Formatear género
  const formatGender = (gender: string) => {
    return gender === 'male' ? 'Masculino' : 'Femenino';
  };

  return (
    // Overlay del modal
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Contenedor del modal */}
      <div 
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevenir cierre al hacer click dentro del modal
      >
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
            Detalles del Usuario
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

        {/* Contenido del modal */}
        <div className="p-6">
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-3 text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>
                Cargando detalles...
              </span>
            </div>
          )}

          {/* Error state */}
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
                {error?.message || 'No se pudieron cargar los detalles del usuario'}
              </p>
            </div>
          )}

          {/* Success state - Información del usuario */}
          {user && (
            <div className="space-y-6">
              {/* Información básica con avatar */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
                    {user.age} años • {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                  </p>
                </div>
              </div>

              {/* Detalles específicos requeridos por la consigna */}
              <div className="grid grid-cols-1 gap-4">
                {/* Género */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
                        Género
                      </p>
                      <p className="text-sm text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
                        {formatGender(user.gender)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
                        Teléfono
                      </p>
                      <p className="text-sm text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
                        {user.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fecha de nacimiento */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
                        Fecha de nacimiento
                      </p>
                      <p className="text-sm text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
                        {formatBirthDate(user.birthDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nombre de usuario */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2a2 2 0 00-2-2m0 0V5a2 2 0 10-4 0v2m4 0a2 2 0 014 0v2m-6 0a2 2 0 100 4m-6 0a2 2 0 100-4m6 4a2 2 0 100-4m-6-4V9a2 2 0 00-2-2m2 2a2 2 0 002 2m-2-2V7a2 2 0 112 0v2m-2 0V5a2 2 0 10-4 0v2m6 0V7a2 2 0 10-4 0v2" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
                        Nombre de usuario
                      </p>
                      <p className="text-sm text-gray-900 font-mono" style={{fontFamily: 'Arial, sans-serif'}}>
                        @{user.username}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email (información adicional) */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
                        Email
                      </p>
                      <p className="text-sm text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer del modal */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              style={{fontFamily: 'Arial, sans-serif'}}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;