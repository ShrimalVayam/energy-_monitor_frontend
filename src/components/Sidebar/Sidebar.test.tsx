import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  const renderWithRouter = (
    collapsed: boolean,
    toggleSidebar = jest.fn(),
    initialRoute = '/devices'
  ) => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route
            path="*"
            element={
              <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders expanded sidebar with label and icon', () => {
    renderWithRouter(false);

    expect(screen.getByText('Energy Monitor')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Create Device')).toBeInTheDocument();
    expect(screen.getByText('Create Telemetry')).toBeInTheDocument();
  });

  it('renders collapsed sidebar without labels', () => {
    renderWithRouter(true);

    expect(screen.queryByText('Energy Monitor')).not.toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Create Device')).not.toBeInTheDocument();
    expect(screen.queryByText('Create Telemetry')).not.toBeInTheDocument();
  });

  it('highlights the active route', () => {
    renderWithRouter(false, jest.fn(), '/create-device');

    const activeLink = screen.getByText('Create Device').closest('a');
    expect(activeLink).toHaveClass('bg-slate-700');
  });

  it('calls toggleSidebar when toggle button is clicked', () => {
    const toggleSidebar = jest.fn();
    renderWithRouter(false, toggleSidebar);

    const toggleButton = screen.getByRole('button', {
      name: /toggle sidebar/i,
    });
    fireEvent.click(toggleButton);
    expect(toggleSidebar).toHaveBeenCalled();
  });
});
