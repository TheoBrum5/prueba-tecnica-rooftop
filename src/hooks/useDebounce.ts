// src/hooks/useDebounce.ts

import { useState, useEffect } from 'react';

/**
 * Hook que implementa debounce para retrasar la actualización de un valor
 * @param value - El valor que queremos "debouncear" 
 * @param delay - Tiempo en ms para esperar antes de actualizar (300-500ms recomendado)
 * @returns El valor debounceado que se actualiza después del delay
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configurar el timer que actualizará el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timeout si el valor cambia antes de que termine el delay
    // Esto es lo que implementa el "debounce" - resetea el timer en cada cambio
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Solo re-ejecutar si value o delay cambian

  return debouncedValue;
}