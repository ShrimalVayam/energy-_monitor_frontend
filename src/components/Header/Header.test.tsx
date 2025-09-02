import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Header', () => {
  const logoutMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ logout: logoutMock });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header and calls logout + navigate on button click', () => {
    render(<Header />);

    expect(screen.getByText('Smart Energy Monitor')).toBeInTheDocument();

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
