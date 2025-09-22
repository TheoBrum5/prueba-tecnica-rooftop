// src/components/UserTable/UserTable.tsx

import React from 'react';
import type { User } from '../../types/User';
import TableHeader from './TableHeader';
import UserRow from './UserRow';
import AdminRow from './AdminRow';

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUserClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{fontFamily: 'Arial, sans-serif'}}>
        <TableHeader />
        
        <tbody className="bg-white">
          {users.map((user, index) => 
            user.role === 'admin' ? (
              <AdminRow
                key={user.id}
                user={user}
                index={index}
                onUserClick={onUserClick}
              />
            ) : (
              <UserRow
                key={user.id}
                user={user}
                index={index}
                onUserClick={onUserClick}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;