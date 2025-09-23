// src/components/SearchInput/SearchInput.tsx - CON VALIDACIÓN

import React, { useState, useEffect } from 'react';
import { useSearchValidation } from '../../hooks/useSearchValidation';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onValidationChange?: (isValid: boolean) => void; // Callback para informar estado de validación
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Buscar usuarios por nombre...",
  disabled = false,
  onValidationChange
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false); // Para mostrar errores solo después del primer focus
  
  // Hook de validación con configuración personalizada
  const { validateSearch, validationError, clearValidationError } = useSearchValidation({
    minLength: 2, // Mínimo 2 caracteres para buscar
    maxLength: 50, // Máximo 50 caracteres
  });

  // Validar en tiempo real
  useEffect(() => {
    if (value.length === 0) {
      clearValidationError();
      onValidationChange?.(true); // Valor vacío es válido
      return;
    }

    const result = validateSearch(value);
    onValidationChange?.(result.isValid);

    // Si el valor sanitizado es diferente al original, actualizarlo
    if (result.sanitizedValue !== value && result.sanitizedValue.length > 0) {
      onChange(result.sanitizedValue);
    }
  }, [value, validateSearch, clearValidationError, onChange, onValidationChange]);

  // Manejar cambios en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Prevenir entrada de caracteres obviamente maliciosos en tiempo real
    const dangerousChars = /[<>{}[\];:|&]/;
    if (dangerousChars.test(newValue)) {
      return; // No permitir la entrada
    }

    onChange(newValue);
  };

  // Manejar focus
  const handleFocus = () => {
    setIsFocused(true);
    setHasBeenFocused(true);
  };

  // Manejar blur
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Determinar si mostrar el error
  const shouldShowError = validationError && hasBeenFocused && !isFocused && value.length > 0;

  // Determinar estados visuales
  const isError = shouldShowError;
  const isSuccess = value.length > 0 && !validationError && hasBeenFocused;

  return (
    <div className="relative">
      {/* Icono de búsqueda */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg 
          className={`h-5 w-5 transition-colors ${
            isError ? 'text-red-400' : 
            isSuccess ? 'text-green-400' : 
            'text-gray-400'
          }`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>

      {/* Input de búsqueda */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={50} // Límite hard en el HTML también
        className={`
          w-full pl-10 pr-12 py-2 
          border rounded-md transition-colors
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:opacity-50 disabled:cursor-not-allowed
          text-sm
          ${isError 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : isSuccess 
            ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }
        `}
        style={{ fontFamily: 'Arial, sans-serif' }}
        autoComplete="off"
        spellCheck="false"
      />

      {/* Indicadores de estado en el lado derecho */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
        {/* Indicador de estado de validación */}
        {value.length > 0 && hasBeenFocused && (
          <>
            {isError && (
              <div className="text-red-500" title="Error de validación">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            )}
            
            {isSuccess && (
              <div className="text-green-500" title="Búsqueda válida">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </>
        )}

        {/* Botón para limpiar búsqueda */}
        {value && (
          <button
            onClick={() => {
              onChange('');
              clearValidationError();
            }}
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

      {/* Mensaje de error */}
      {shouldShowError && (
        <div className="mt-1 flex items-center">
          <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-sm text-red-600" style={{fontFamily: 'Arial, sans-serif'}}>
            {validationError}
          </p>
        </div>
      )}

      {/* Contador de caracteres (cuando se acerca al límite) */}
      {value.length > 40 && (
        <div className="mt-1 text-right">
          <span className={`text-xs ${value.length > 45 ? 'text-red-500' : 'text-gray-500'}`} style={{fontFamily: 'Arial, sans-serif'}}>
            {value.length}/50
          </span>
        </div>
      )}

      {/* Ayuda contextual */}
      {isFocused && value.length === 0 && (
        <div className="mt-1">
          <p className="text-xs text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
            Busca por nombre (mínimo 2 caracteres). Solo letras, espacios, guiones y puntos.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;