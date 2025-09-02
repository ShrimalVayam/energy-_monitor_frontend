import React from 'react';

type InputFieldProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
};

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  icon,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div
        className={`flex items-center border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        {icon && <span className="mr-2 text-gray-500">{icon}</span>}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full outline-none bg-transparent"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
