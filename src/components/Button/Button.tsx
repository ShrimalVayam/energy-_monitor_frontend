import classNames from 'classnames';
import type { ReactNode } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
  disabled?: boolean;
};

export default function Button({
  type = 'button',
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'w-full py-2 rounded font-medium transition-colors duration-200';
  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200',
    outline: 'border border-gray-300 text-black bg-white hover:bg-gray-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(baseStyles, variants[variant], className, {
        'opacity-50 cursor-not-allowed': disabled,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
