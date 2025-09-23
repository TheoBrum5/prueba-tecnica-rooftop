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

  const readParamsFromUrl = useCallback((): UrlParamsState => {
    const urlParams = new URLSearchParams(window.location.search);
    
    return {
      page: parseInt(urlParams.get('page') || '1', 10) || 1,
      limit: parseInt(urlParams.get('limit') || '5', 10) || 5,
      search: urlParams.get('search') || ''
    };
  }, []);

  const [params, setParams] = useState<UrlParamsState>(readParamsFromUrl);

  const updateUrl = useCallback((newParams: UrlParamsState) => {
    const urlParams = new URLSearchParams();
    
    if (newParams.page !== DEFAULT_PARAMS.page) {
      urlParams.set('page', newParams.page.toString());
    }
    
    if (newParams.limit !== DEFAULT_PARAMS.limit) {
      urlParams.set('limit', newParams.limit.toString());
    }
    
    if (newParams.search !== DEFAULT_PARAMS.search && newParams.search.trim()) {
      urlParams.set('search', newParams.search);
    }

    const newUrl = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;

    window.history.pushState({}, '', newUrl);
  }, []);

  const updateParams = useCallback((newParams: Partial<UrlParamsState>) => {
    setParams(currentParams => {
      const updatedParams = { ...currentParams, ...newParams };
      
      updatedParams.page = Math.max(1, updatedParams.page);
      updatedParams.limit = Math.max(1, Math.min(100, updatedParams.limit));
      updatedParams.search = updatedParams.search.substring(0, 50); 
      
      updateUrl(updatedParams);
      
      return updatedParams;
    });
  }, [updateUrl]);

  const resetParams = useCallback(() => {
    setParams(DEFAULT_PARAMS);
    updateUrl(DEFAULT_PARAMS);
  }, [updateUrl]);

  useEffect(() => {
    const handlePopState = () => {
      setParams(readParamsFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [readParamsFromUrl]);

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