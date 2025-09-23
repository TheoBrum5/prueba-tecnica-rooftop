import React from 'react';
import type { User } from '../../types/User';
import { formatGender, formatBirthDate } from '../../utils';
import UserDetailItem from './UserDetailItem';

interface UserDetailsListProps {
  user: User;
}

const UserDetailsList: React.FC<UserDetailsListProps> = ({ user }) => {
  const detailItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: 'Género',
      value: formatGender(user.gender)
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Teléfono',
      value: user.phone
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Fecha de nacimiento',
      value: formatBirthDate(user.birthDate)
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2a2 2 0 00-2-2m0 0V5a2 2 0 10-4 0v2m4 0a2 2 0 014 0v2m-6 0a2 2 0 100 4m-6 0a2 2 0 100-4m6 4a2 2 0 100-4m-6-4V9a2 2 0 00-2-2m2 2a2 2 0 002 2m-2-2V7a2 2 0 112 0v2m-2 0V5a2 2 0 10-4 0v2m6 0V7a2 2 0 10-4 0v2" />
        </svg>
      ),
      label: 'Nombre de usuario',
      value: `@${user.username}`,
      valueClassName: 'font-mono'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: user.email
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {detailItems.map((item, index) => (
        <UserDetailItem
          key={index}
          icon={item.icon}
          label={item.label}
          value={item.value}
          valueClassName={item.valueClassName}
        />
      ))}
    </div>
  );
};

export default UserDetailsList;