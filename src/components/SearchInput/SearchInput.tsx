import React, { useState, useEffect } from 'react';
import { useSearchValidation } from '../../hooks/useSearchValidation';
import { SEARCH_CONFIG, UI_TEXT } from '../../constants';
import BaseInput from './BaseInput';
import ValidationMessage from './ValidationMessage';
import CharacterCounter from './CharacterCounter';
import HelpText from './HelpText';
import ActionButtons from './ActionButtons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = UI_TEXT.PLACEHOLDERS.SEARCH,
  disabled = false,
  onValidationChange
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  
  const { validateSearch, validationError, clearValidationError } = useSearchValidation({
    minLength: SEARCH_CONFIG.MIN_LENGTH,
    maxLength: SEARCH_CONFIG.MAX_LENGTH,
  });

  useEffect(() => {
    if (value.length === 0) {
      clearValidationError();
      onValidationChange?.(true);
      return;
    }

    const result = validateSearch(value);
    onValidationChange?.(result.isValid);

    if (result.sanitizedValue !== value && result.sanitizedValue.length > 0) {
      onChange(result.sanitizedValue);
    }
  }, [value, validateSearch, clearValidationError, onChange, onValidationChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    const dangerousChars = /[<>{}[\];:|&]/;
    if (dangerousChars.test(newValue)) {
      return;
    }

    onChange(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setHasBeenFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    onChange('');
    clearValidationError();
  };

  const shouldShowError = validationError && hasBeenFocused && !isFocused && value.length > 0;
  const isError = shouldShowError;
  const isSuccess = value.length > 0 && !validationError && hasBeenFocused;

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <BaseInput
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        isError={isError}
        isSuccess={isSuccess}
        maxLength={SEARCH_CONFIG.MAX_LENGTH}
      />

      <ActionButtons
        showError={isError && hasBeenFocused}
        showSuccess={isSuccess}
        showClear={!!value}
        onClear={handleClear}
        disabled={disabled}
      />

      {shouldShowError && validationError && (
        <ValidationMessage message={validationError} />
      )}

      <CharacterCounter 
        current={value.length}
        max={SEARCH_CONFIG.MAX_LENGTH}
        threshold={40}
      />

      <HelpText isVisible={isFocused && value.length === 0} />
    </div>
  );
};

export default SearchInput;