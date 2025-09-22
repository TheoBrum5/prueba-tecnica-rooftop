// src/components/UserTable/TableHeader.tsx

import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="text-white" style={{ WebkitTextFillColor: 'white', backgroundColor: '#000000' }}>
        <th className="px-8 py-3 text-left text-sm font-normal tracking-wider" style={{fontFamily: 'Arial, sans-serif'}}>
          #
        </th>
        <th className="px-8 py-3 text-left text-sm font-normal tracking-wider" style={{fontFamily: 'Arial, sans-serif'}}>
          Nombre Completo
        </th>
        <th className="px-8 py-3 text-left text-sm font-normal tracking-wider" style={{fontFamily: 'Arial, sans-serif'}}>
          Email
        </th>
        <th className="px-8 py-3 text-left text-sm font-normal tracking-wider" style={{fontFamily: 'Arial, sans-serif'}}>
          Rol
        </th>
        <th className="px-8 py-3 text-left text-sm font-normal tracking-wider" style={{fontFamily: 'Arial, sans-serif'}}>
          Edad
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;