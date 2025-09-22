// src/App.tsx

import React from 'react';
import Header from './components/Header';
import UserTable from './components/UserTable';
import { mockUsers } from './data/mockUsers';
import type { User } from './types/User';

function App() {
  const handleUserClick = (user: User) => {
    console.log('Usuario seleccionado:', user);
    // Aquí irá la lógica del modal más tarde
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header currentPage="Usuarios" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
            USUARIOS
          </h2>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
          <UserTable users={mockUsers} onUserClick={handleUserClick} />
          
          {/* Paginación */}
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <button 
                className="px-2 py-1 text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
                disabled
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                &#8249;
              </button>
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 font-medium border border-gray-300" style={{fontFamily: 'Arial, sans-serif'}}>
                1
              </span>
              <button className="px-2 py-1 text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors" style={{fontFamily: 'Arial, sans-serif'}}>
                &#8250;
              </button>
              <span className="text-sm text-gray-600 ml-2" style={{fontFamily: 'Arial, sans-serif'}}>
                de 4 páginas
              </span>
            </div>
            
            {/* Items per page selector */}
            <div className="flex justify-end mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>Mostrando</span>
                <select className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" style={{fontFamily: 'Arial, sans-serif'}}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span className="text-sm text-gray-600" style={{fontFamily: 'Arial, sans-serif'}}>elementos por página</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;