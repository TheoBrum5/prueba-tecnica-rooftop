// src/components/UserTable/UserRow.tsx

import React from 'react';
import type { User } from '../../types/User';

interface UserRowProps {
  user: User;
  index: number;
  onUserClick: (user: User) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, index, onUserClick }) => {
  const getFullName = (): string => {
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-200"
      onClick={() => onUserClick(user)}
    >
      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
        {index + 1}
      </td>
      
      <td className="px-8 py-4 whitespace-nowrap">
        <span className="text-sm cursor-pointer hover:underline text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
          {getFullName()}
        </span>
      </td>
      
      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
        {user.email}
      </td>
      
      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
        {user.role}
      </td>
      
      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
        {user.age}
      </td>
    </tr>
  );
};

export default UserRow;