import React from 'react';
import type { User } from '../../types/User';
import { getFullName } from '../../utils';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16', 
    lg: 'h-20 w-20'
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;
  };

  return (
    <img
      className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200`}
      src={user.image}
      alt={getFullName(user)}
      onError={handleImageError}
    />
  );
};

export default UserAvatar;