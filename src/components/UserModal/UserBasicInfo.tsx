import React from 'react';
import type { User } from '../../types/User';
import { getFullName, formatUserRole } from '../../utils';
import UserAvatar from './UserAvatar';

interface UserBasicInfoProps {
  user: User;
}

const UserBasicInfo: React.FC<UserBasicInfoProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <UserAvatar user={user} size="md" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
          {getFullName(user)}
        </h3>
        <p className="text-sm text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
          {user.age} años • {formatUserRole(user.role)}
        </p>
      </div>
    </div>
  );
};

export default UserBasicInfo;