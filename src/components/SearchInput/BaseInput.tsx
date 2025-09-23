import React from 'react';

interface BaseInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  disabled: boolean;
  isError: boolean;
  isSuccess: boolean;
  maxLength: number;
}

const BaseInput: React.FC<BaseInputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  disabled,
  isError,
  isSuccess,
  maxLength
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={`
        w-full pl-10 pr-12 py-2 
        border rounded-md transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-0
        disabled:opacity-50 disabled:cursor-not-allowed
        text-sm
        ${isError 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
          : isSuccess 
          ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        }
      `}
      style={{ fontFamily: 'Arial, sans-serif' }}
      autoComplete="off"
      spellCheck="false"
    />
  );
};

export default BaseInput;