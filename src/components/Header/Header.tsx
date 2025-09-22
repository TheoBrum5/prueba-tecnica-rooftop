// src/components/Header/Header.tsx

import React, { useState } from 'react';

type HeaderProps = {
  currentPage?: string;
};

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Usuarios', href: '#' },
  { name: 'Sobre nosotros', href: '#' },
  { name: 'Empresa', href: '#' }
] as const;

const Header: React.FC<HeaderProps> = ({ currentPage = 'Usuarios' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo ACME */}
          <div className="flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight" style={{fontFamily: 'Arial, sans-serif'}}>
                ACME
              </span>
              <span className="text-xs text-gray-600 font-normal tracking-widest" style={{fontFamily: 'Arial, sans-serif'}}>
                CORPORATION
              </span>
            </div>
          </div>

          {/* Navegación - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors duration-200 ${
                  item.name === currentPage 
                    ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1" 
                    : "text-gray-700 hover:text-gray-900 font-medium"
                }`}
                style={{fontFamily: 'Arial, sans-serif'}}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Menú móvil button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-white">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base transition-colors duration-200 rounded-md ${
                    item.name === currentPage
                      ? "text-gray-900 bg-gray-100 font-semibold"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium"
                  }`}
                  style={{fontFamily: 'Arial, sans-serif'}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;