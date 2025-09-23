// src/App.tsx - CON SINCRONIZACIÓN URL

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserTable from './components/UserTable';
import SearchInput from './components/SearchInput';
import UserModal from './components/UserModal';
import { useUsers } from './hooks/useUsers';
import { useDebounce } from './hooks/useDebounce';
import { useUrlParams } from './hooks/useUrlParams';
import type { User } from './types/User';

function App() {
  // Hook para sincronización con URL - esto maneja page, limit, y search
  const { params: urlParams, updateParams: updateUrlParams } = useUrlParams();
  
  // Estados locales sincronizados con URL
  const [currentPage, setCurrentPage] = useState(urlParams.page);
  const [pageSize, setPageSize] = useState(urlParams.limit);
  const [searchInputValue, setSearchInputValue] = useState(urlParams.search);
  
  // Estado de validación de búsqueda
  const [isSearchValid, setIsSearchValid] = useState(true);
  
  // Valor debounced que se usa para la API
  const debouncedSearchQuery = useDebounce(
    isSearchValid ? searchInputValue : '', 
    400
  );

  // Estados para el modal
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sincronizar estado local con cambios en URL (navegación del navegador)
  useEffect(() => {
    setCurrentPage(urlParams.page);
    setPageSize(urlParams.limit);
    setSearchInputValue(urlParams.search);
  }, [urlParams]);

  // React Query hook
  const { data, isLoading, isError, error } = useUsers({
    page: currentPage,
    limit: pageSize,
    searchQuery: debouncedSearchQuery,
  });

  // Manejar click en usuario - abrir modal
  const handleUserClick = (user: User) => {
    console.log('Usuario seleccionado:', user);
    setSelectedUserId(user.id);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  // Manejar cambio de página
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateUrlParams({ page: newPage });
  };

  // Manejar cambio de tamaño de página
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Resetear a página 1
    updateUrlParams({ 
      limit: newSize, 
      page: 1 
    });
  };

  // Manejar cambio de búsqueda
  const handleSearchChange = (value: string) => {
    setSearchInputValue(value);
    setCurrentPage(1); // Resetear a página 1
    
    // Actualizar URL inmediatamente (sin debounce para la URL)
    updateUrlParams({ 
      search: value, 
      page: 1 
    });
  };

  // Callback para manejar cambios en la validación
  const handleValidationChange = (isValid: boolean) => {
    setIsSearchValid(isValid);
  };

  // Función para limpiar todos los filtros
  const handleClearAllFilters = () => {
    setSearchInputValue('');
    setCurrentPage(1);
    setPageSize(5);
    updateUrlParams({ 
      search: '', 
      page: 1, 
      limit: 5 
    });
  };

  // Calcular información de paginación
  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Determinar si hay filtros activos
  const hasActiveFilters = debouncedSearchQuery.length > 0 || pageSize !== 5 || currentPage !== 1;
  const isSearchActive = debouncedSearchQuery.length > 0;
  const isSearchInvalid = searchInputValue.length > 0 && !isSearchValid;

  // Loading state
  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="Usuarios" />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
              USUARIOS
            </h2>
          </div>
          <div className="bg-white shadow-sm overflow-hidden border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-3 text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>
                Cargando usuarios...
              </span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="Usuarios" />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
              USUARIOS
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
                Error al cargar usuarios
              </h3>
              <p className="text-gray-600 mb-4" style={{fontFamily: 'Arial, sans-serif'}}>
                {error?.message || 'Hubo un problema al conectar con el servidor'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                Reintentar
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Usuarios" />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
            USUARIOS
          </h2>
          
          {/* Botón para limpiar filtros (si hay filtros activos) */}
          {hasActiveFilters && (
            <button
              onClick={handleClearAllFilters}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              style={{fontFamily: 'Arial, sans-serif'}}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Indicador de URL actual (para debugging/demostración) */}
        {(isSearchActive || currentPage !== 1 || pageSize !== 5) && (
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

        {/* Buscador con validación */}
        <div className="mb-4 flex justify-end">
          <div className="w-80">
            <SearchInput
              value={searchInputValue}
              onChange={handleSearchChange}
              onValidationChange={handleValidationChange}
              placeholder="Buscar usuarios por nombre..."
              disabled={isLoading}
            />
            
            {/* Indicadores de estado de búsqueda */}
            <div className="mt-1 min-h-[20px]">
              {/* Búsqueda activa y válida */}
              {isSearchActive && isSearchValid && (
                <div className="flex items-center text-xs text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
                  <span>Buscando: "{debouncedSearchQuery}"</span>
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
              
              {/* Búsqueda inválida */}
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
          {/* Banner de búsqueda activa */}
          {isLoading && data && isSearchActive && (
            <div className="bg-blue-50 px-6 py-2 border-b border-blue-200">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-sm text-blue-700" style={{fontFamily: 'Arial, sans-serif'}}>
                  Buscando usuarios...
                </span>
              </div>
            </div>
          )}

          {/* Banner de validación inválida */}
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
          
          <UserTable users={data?.users || []} onUserClick={handleUserClick} />
          
          {/* Mensaje si no hay resultados de búsqueda válida */}
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
                onClick={() => handleSearchChange('')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
          
          {/* Paginación */}
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <button 
                className="px-2 py-1 text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasPrevPage || isLoading}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                &#8249;
              </button>
              
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 font-medium border border-gray-300" style={{fontFamily: 'Arial, sans-serif'}}>
                {currentPage}
              </span>
              
              <button 
                className="px-2 py-1 text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasNextPage || isLoading}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                &#8250;
              </button>
              
              <span className="text-sm text-gray-600 ml-2" style={{fontFamily: 'Arial, sans-serif'}}>
                de {totalPages} páginas
              </span>
            </div>
            
            {/* Selector de elementos por página */}
            <div className="flex justify-end mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>Mostrando</span>
                <select 
                  className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50" 
                  style={{fontFamily: 'Arial, sans-serif'}}
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  disabled={isLoading}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
                <span className="text-sm text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>elementos por página</span>
              </div>
            </div>

            {/* Información adicional */}
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span style={{fontFamily: 'Arial, sans-serif'}}>
                Mostrando {data?.users.length ? ((currentPage - 1) * pageSize) + 1 : 0}-{Math.min(currentPage * pageSize, data?.total || 0)} de {data?.total || 0} usuarios
                {isSearchActive && isSearchValid && (
                  <span className="ml-1">(filtrados)</span>
                )}
              </span>
              
              {/* Estado de búsqueda y URL */}
              <div className="flex items-center space-x-4">
                {isSearchActive && isSearchValid && (
                  <span style={{fontFamily: 'Arial, sans-serif'}}>
                    Búsqueda: "{debouncedSearchQuery}"
                  </span>
                )}
                
                {isSearchInvalid && (
                  <span className="text-red-500" style={{fontFamily: 'Arial, sans-serif'}}>
                    Búsqueda inválida
                  </span>
                )}

                {/* Indicador de que el estado está sincronizado con URL */}
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

      {/* Modal de usuario */}
      <UserModal 
        userId={selectedUserId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;