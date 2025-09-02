import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField Component', () => {
  const defaultProps = {
    label: 'Email',
    name: 'email',
    value: '',
    onChange: jest.fn(),
  };

  it('renders label and input', () => {
    render(<InputField {...defaultProps} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the icon if provided', () => {
    render(
      <InputField {...defaultProps} icon={<span data-testid="icon">🔍</span>} />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('calls onChange handler when input changes', () => {
    render(<InputField {...defaultProps} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('calls onBlur handler if provided', () => {
    const onBlur = jest.fn();
    render(<InputField {...defaultProps} onBlur={onBlur} />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalled();
  });

  it('displays error message and red border when error prop is passed', () => {
    render(<InputField {...defaultProps} error="Invalid email" />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByRole('textbox').parentElement).toHaveClass(
      'border-red-500'
    );
  });
});
