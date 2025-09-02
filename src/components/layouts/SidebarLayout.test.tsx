import { render, screen, fireEvent } from '@testing-library/react';
import SidebarLayout from './SidebarLayout';

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};
jest.mock(
  '../Sidebar/Sidebar',
  () =>
    ({ collapsed, toggleSidebar }: SidebarProps) => (
      <div data-testid="sidebar">
        <button onClick={toggleSidebar}>Toggle</button>
        <span>{collapsed ? 'Collapsed' : 'Expanded'}</span>
      </div>
    )
);

describe('SidebarLayout', () => {
  it('renders children correctly', () => {
    render(
      <SidebarLayout>
        <p>Test Child</p>
      </SidebarLayout>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders Sidebar with collapsed = false initially', () => {
    render(
      <SidebarLayout>
        <p>Child</p>
      </SidebarLayout>
    );

    expect(screen.getByText('Expanded')).toBeInTheDocument();
  });

  it('toggles the sidebar when toggleSidebar is called', () => {
    render(
      <SidebarLayout>
        <p>Child</p>
      </SidebarLayout>
    );

    const toggleButton = screen.getByText('Toggle');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Collapsed')).toBeInTheDocument();
  });

  it('applies correct class when collapsed', () => {
    const { container } = render(
      <SidebarLayout>
        <p>Child</p>
      </SidebarLayout>
    );

    const toggleButton = screen.getByText('Toggle');
    fireEvent.click(toggleButton);

    const mainDiv = container.querySelector('div.flex > div:last-child');
    expect(mainDiv).toHaveClass('ml-16');
  });
});
