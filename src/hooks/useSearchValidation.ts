// src/hooks/useSearchValidation.ts

import { useState, useCallback } from 'react';

interface ValidationResult {
  isValid: boolean;
  error: string | null;
  sanitizedValue: string;
}

interface SearchValidationConfig {
  minLength?: number;
  maxLength?: number;
  allowedPattern?: RegExp;
  forbiddenPatterns?: RegExp[];
}

const DEFAULT_CONFIG: Required<SearchValidationConfig> = {
  minLength: 0,
  maxLength: 50,
  allowedPattern: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\-\.]*$/, // Letras, espacios, guiones y puntos
  forbiddenPatterns: [
    /[<>]/,           // Prevenir HTML/XML
    /[{}]/,           // Prevenir objetos JS
    /[\[\]]/,         // Prevenir arrays
    /[;:]/,           // Prevenir comandos SQL
    /[|&]/,           // Prevenir comandos de consola
  ]
};

export const useSearchValidation = (config: SearchValidationConfig = {}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const validateSearch = useCallback((value: string): ValidationResult => {
    // Sanitizar entrada básica
    let sanitizedValue = value.trim();
    
    // Verificar longitud mínima
    if (sanitizedValue.length > 0 && sanitizedValue.length < finalConfig.minLength) {
      const error = `La búsqueda debe tener al menos ${finalConfig.minLength} caracteres`;
      setValidationError(error);
      return {
        isValid: false,
        error,
        sanitizedValue
      };
    }

    // Verificar longitud máxima
    if (sanitizedValue.length > finalConfig.maxLength) {
      const error = `La búsqueda no puede exceder ${finalConfig.maxLength} caracteres`;
      setValidationError(error);
      return {
        isValid: false,
        error,
        sanitizedValue: sanitizedValue.substring(0, finalConfig.maxLength)
      };
    }

    // Verificar patrones prohibidos
    for (const forbiddenPattern of finalConfig.forbiddenPatterns) {
      if (forbiddenPattern.test(sanitizedValue)) {
        const error = 'La búsqueda contiene caracteres no permitidos';
        setValidationError(error);
        return {
          isValid: false,
          error,
          sanitizedValue
        };
      }
    }

    // Verificar patrón permitido
    if (sanitizedValue.length > 0 && !finalConfig.allowedPattern.test(sanitizedValue)) {
      const error = 'Solo se permiten letras, números, espacios, guiones y puntos';
      setValidationError(error);
      return {
        isValid: false,
        error,
        sanitizedValue
      };
    }

    // Sanitización adicional - remover espacios múltiples
    sanitizedValue = sanitizedValue.replace(/\s+/g, ' ');

    // Validación exitosa
    setValidationError(null);
    return {
      isValid: true,
      error: null,
      sanitizedValue
    };
  }, [finalConfig]);

  const clearValidationError = useCallback(() => {
    setValidationError(null);
  }, []);

  return {
    validateSearch,
    validationError,
    clearValidationError
  };
};