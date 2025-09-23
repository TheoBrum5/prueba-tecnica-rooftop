import React from 'react';

interface UserDetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}

const UserDetailItem: React.FC<UserDetailItemProps> = ({ 
  icon, 
  label, 
  value, 
  valueClassName = '' 
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center">
        <div className="text-gray-400 mr-3">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500" style={{fontFamily: 'Arial, sans-serif'}}>
            {label}
          </p>
          <p className={`text-sm text-gray-900 ${valueClassName}`} style={{fontFamily: 'Arial, sans-serif'}}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailItem;