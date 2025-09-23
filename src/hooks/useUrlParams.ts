// src/hooks/useUrlParams.ts

import { useState, useEffect, useCallback } from 'react';

interface UrlParamsState {
  page: number;
  limit: number;
  search: string;
}

interface UseUrlParamsReturn {
  params: UrlParamsState;
  updateParams: (newParams: Partial<UrlParamsState>) => void;
  resetParams: () => void;
}

const DEFAULT_PARAMS: UrlParamsState = {
  page: 1,
  limit: 5,
  search: ''
};

export const useUrlParams = (): UseUrlParamsReturn => {
  // Función para leer parámetros actuales de la URL
  const readParamsFromUrl = useCallback((): UrlParamsState => {
    const urlParams = new URLSearchParams(window.location.search);
    
    return {
      page: parseInt(urlParams.get('page') || '1', 10) || 1,
      limit: parseInt(urlParams.get('limit') || '5', 10) || 5,
      search: urlParams.get('search') || ''
    };
  }, []);

  // Estado inicial basado en URL
  const [params, setParams] = useState<UrlParamsState>(readParamsFromUrl);

  // Función para actualizar la URL sin recargar la página
  const updateUrl = useCallback((newParams: UrlParamsState) => {
    const urlParams = new URLSearchParams();
    
    // Solo agregar parámetros que no sean valores por defecto
    if (newParams.page !== DEFAULT_PARAMS.page) {
      urlParams.set('page', newParams.page.toString());
    }
    
    if (newParams.limit !== DEFAULT_PARAMS.limit) {
      urlParams.set('limit', newParams.limit.toString());
    }
    
    if (newParams.search !== DEFAULT_PARAMS.search && newParams.search.trim()) {
      urlParams.set('search', newParams.search);
    }

    // Construir nueva URL
    const newUrl = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;

    // Actualizar URL sin recargar la página
    window.history.pushState({}, '', newUrl);
  }, []);

  // Función para actualizar parámetros
  const updateParams = useCallback((newParams: Partial<UrlParamsState>) => {
    setParams(currentParams => {
      const updatedParams = { ...currentParams, ...newParams };
      
      // Validaciones
      updatedParams.page = Math.max(1, updatedParams.page);
      updatedParams.limit = Math.max(1, Math.min(100, updatedParams.limit)); // Entre 1 y 100
      updatedParams.search = updatedParams.search.substring(0, 50); // Máximo 50 caracteres
      
      // Actualizar URL
      updateUrl(updatedParams);
      
      return updatedParams;
    });
  }, [updateUrl]);

  // Función para resetear parámetros
  const resetParams = useCallback(() => {
    setParams(DEFAULT_PARAMS);
    updateUrl(DEFAULT_PARAMS);
  }, [updateUrl]);

  // Escuchar cambios en el historial del navegador (botones back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setParams(readParamsFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [readParamsFromUrl]);

  // Sincronizar con URL cuando el componente se monta
  useEffect(() => {
    const urlParams = readParamsFromUrl();
    setParams(urlParams);
  }, [readParamsFromUrl]);

  return {
    params,
    updateParams,
    resetParams
  };
};