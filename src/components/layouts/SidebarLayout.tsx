import { useState } from 'react';
import clsx from 'clsx';
import Sidebar from '../Sidebar/Sidebar';

type Props = {
  children: React.ReactNode;
};

export default function SidebarLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div
        className={clsx(
          'transition-all duration-300 ease-in-out min-h-screen bg-slate-800 p-4 w-full',
          collapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {children}
      </div>
    </div>
  );
}
