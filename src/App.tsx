import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserTable from './components/UserTable';
import SearchInput from './components/SearchInput';
import UserModal from './components/UserModal';
import { LoadingState, ErrorState } from './components/UI';
import { useUsers } from './hooks/useUsers';
import { useDebounce } from './hooks/useDebounce';
import { useUrlParams } from './hooks/useUrlParams';
import { calculatePaginationInfo } from './utils';
import { SEARCH_CONFIG, UI_TEXT } from './constants';
import type { User } from './types/User';

const MainContent: React.FC<{
  data: any;
  searchInputValue: string;
  debouncedSearchQuery: string;
  isSearchValid: boolean;
  isLoading: boolean;
  currentPage: number;
  pageSize: number;
  onSearchChange: (value: string) => void;
  onValidationChange: (isValid: boolean) => void;
  onUserClick: (user: User) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}> = ({
  data,
  searchInputValue,
  debouncedSearchQuery,
  isSearchValid,
  isLoading,
  currentPage,
  pageSize,
  onSearchChange,
  onValidationChange,
  onUserClick,
  onPageChange,
  onPageSizeChange,
  onClearFilters,
  hasActiveFilters
}) => {
  const paginationInfo = calculatePaginationInfo(currentPage, pageSize, data?.total || 0);
  const isSearchActive = debouncedSearchQuery.length > 0;
  const isSearchInvalid = searchInputValue.length > 0 && !isSearchValid;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Usuarios" />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header de sección con botón limpiar filtros */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
            USUARIOS
          </h2>
          
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              style={{fontFamily: 'Arial, sans-serif'}}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {UI_TEXT.BUTTONS.CLEAR_FILTERS}
            </button>
          )}
        </div>

        {/* Indicador de URL actualizada */}
        {hasActiveFilters && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1a3 3 0 016.364-.366L13.828 10.172zM7.828 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.102a3 3 0 00-6.364.366L7.828 13.828z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-700" style={{fontFamily: 'Arial, sans-serif'}}>
                  Filtros activos - URL actualizada
                </p>
                <p className="text-xs text-blue-600 mt-1 font-mono break-all" style={{fontFamily: 'monospace'}}>
                  {window.location.href}
                </p>
                <p className="text-xs text-blue-600 mt-1" style={{fontFamily: 'Arial, sans-serif'}}>
                  Puedes copiar este enlace para compartir esta vista específica
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Buscador */}
        <div className="mb-4 flex justify-end">
          <div className="w-80">
            <SearchInput
              value={searchInputValue}
              onChange={onSearchChange}
              onValidationChange={onValidationChange}
              disabled={isLoading}
            />
            
            {/* Indicadores de estado de búsqueda */}
            <div className="mt-1 min-h-[20px]">
              {isSearchActive && isSearchValid && (
                <div className="flex items-center text-xs text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
                  <span>{UI_TEXT.LABELS.SEARCH_ACTIVE} "{debouncedSearchQuery}"</span>
                  {isLoading && (
                    <span className="ml-2 text-blue-600">
                      <svg className="inline w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </div>
              )}
              
              {isSearchInvalid && (
                <div className="flex items-center text-xs text-red-600" style={{fontFamily: 'Arial, sans-serif'}}>
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                  </svg>
                  <span>Búsqueda pausada por error de validación</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabla de usuarios */}
        <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
          {/* Banners de estado */}
          {isLoading && data && isSearchActive && (
            <div className="bg-blue-50 px-6 py-2 border-b border-blue-200">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-sm text-blue-700" style={{fontFamily: 'Arial, sans-serif'}}>
                  {UI_TEXT.LOADING.SEARCH}
                </span>
              </div>
            </div>
          )}

          {isSearchInvalid && (
            <div className="bg-red-50 px-6 py-2 border-b border-red-200">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                </svg>
                <span className="text-sm text-red-700" style={{fontFamily: 'Arial, sans-serif'}}>
                  La búsqueda no se ejecutará hasta que corrijas los errores de validación
                </span>
              </div>
            </div>
          )}
          
          <UserTable users={data?.users || []} onUserClick={onUserClick} />
          
          {/* Mensaje si no hay resultados */}
          {data?.users.length === 0 && isSearchActive && isSearchValid && (
            <div className="px-6 py-8 text-center">
              <div className="text-gray-400 mb-3">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-2" style={{fontFamily: 'Arial, sans-serif'}}>
                No se encontraron usuarios que coincidan con "{debouncedSearchQuery}"
              </p>
              <p className="text-sm text-gray-400 mb-4" style={{fontFamily: 'Arial, sans-serif'}}>
                Intenta con un término de búsqueda diferente
              </p>
              <button
                onClick={() => onSearchChange('')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                {UI_TEXT.BUTTONS.CLEAR_SEARCH}
              </button>
            </div>
          )}
          
          {/* Paginación */}
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <button 
                className="px-2 py-1 text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!paginationInfo.hasPrevPage || isLoading}
                onClick={() => onPageChange(currentPage - 1)}
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                &#8249;
              </button>
              
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 font-medium border border-gray-300" style={{fontFamily: 'Arial, sans-serif'}}>
                {currentPage}
              </span>
              
              <button 
                className="px-2 py-1 text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!paginationInfo.hasNextPage || isLoading}
                onClick={() => onPageChange(currentPage + 1)}
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                &#8250;
              </button>
              
              <span className="text-sm text-gray-600 ml-2" style={{fontFamily: 'Arial, sans-serif'}}>
                {UI_TEXT.LABELS.OF} {paginationInfo.totalPages} {UI_TEXT.LABELS.PAGES}
              </span>
            </div>
            
            {/* Selector de elementos por página */}
            <div className="flex justify-end mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>{UI_TEXT.LABELS.SHOWING}</span>
                <select 
                  className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50" 
                  style={{fontFamily: 'Arial, sans-serif'}}
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                  disabled={isLoading}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
                <span className="text-sm text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>{UI_TEXT.LABELS.ELEMENTS_PER_PAGE}</span>
              </div>
            </div>

            {/* Información adicional */}
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span style={{fontFamily: 'Arial, sans-serif'}}>
                {UI_TEXT.LABELS.SHOWING} {paginationInfo.startItem}-{paginationInfo.endItem} {UI_TEXT.LABELS.OF} {data?.total || 0} usuarios
                {isSearchActive && isSearchValid && (
                  <span className="ml-1">{UI_TEXT.LABELS.FILTERED}</span>
                )}
              </span>
              
              <div className="flex items-center space-x-4">
                {isSearchActive && isSearchValid && (
                  <span style={{fontFamily: 'Arial, sans-serif'}}>
                    {UI_TEXT.LABELS.SEARCH_ACTIVE} "{debouncedSearchQuery}"
                  </span>
                )}
                
                {isSearchInvalid && (
                  <span className="text-red-500" style={{fontFamily: 'Arial, sans-serif'}}>
                    Búsqueda inválida
                  </span>
                )}

                {hasActiveFilters && (
                  <span className="text-green-600" style={{fontFamily: 'Arial, sans-serif'}} title="Estado sincronizado con URL">
                    🔗 Enlace actualizado
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  const { params: urlParams, updateParams: updateUrlParams } = useUrlParams();
  
  const [currentPage, setCurrentPage] = useState(urlParams.page);
  const [pageSize, setPageSize] = useState(urlParams.limit);
  const [searchInputValue, setSearchInputValue] = useState(urlParams.search);
  const [isSearchValid, setIsSearchValid] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const debouncedSearchQuery = useDebounce(
    isSearchValid ? searchInputValue : '', 
    SEARCH_CONFIG.DEBOUNCE_DELAY
  );

  const { data, isLoading, isError, error } = useUsers({
    page: currentPage,
    limit: pageSize,
    searchQuery: debouncedSearchQuery,
  });

  useEffect(() => {
    setCurrentPage(urlParams.page);
    setPageSize(urlParams.limit);
    setSearchInputValue(urlParams.search);
  }, [urlParams]);

  const handleUserClick = (user: User) => {
    setSelectedUserId(user.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateUrlParams({ page: newPage });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    updateUrlParams({ limit: newSize, page: 1 });
  };

  const handleSearchChange = (value: string) => {
    setSearchInputValue(value);
    setCurrentPage(1);
    updateUrlParams({ search: value, page: 1 });
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsSearchValid(isValid);
  };

  const handleClearAllFilters = () => {
    setSearchInputValue('');
    setCurrentPage(1);
    setPageSize(5);
    updateUrlParams({ search: '', page: 1, limit: 5 });
  };

  const hasActiveFilters = debouncedSearchQuery.length > 0 || pageSize !== 5 || currentPage !== 1;

  if (isLoading && !data) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <>
      <MainContent
        data={data}
        searchInputValue={searchInputValue}
        debouncedSearchQuery={debouncedSearchQuery}
        isSearchValid={isSearchValid}
        isLoading={isLoading}
        currentPage={currentPage}
        pageSize={pageSize}
        onSearchChange={handleSearchChange}
        onValidationChange={handleValidationChange}
        onUserClick={handleUserClick}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onClearFilters={handleClearAllFilters}
        hasActiveFilters={hasActiveFilters}
      />
      
      <UserModal 
        userId={selectedUserId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;