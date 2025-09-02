import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaDatabase,
  FaRobot,
  FaChartLine,
  FaHome,
} from 'react-icons/fa';
import { MdElectricBolt, MdDevices } from 'react-icons/md';

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ collapsed, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const deviceIdMatch = location.pathname.match(
    /^\/(?:devices|create-telemetry)\/(\d+)$/
  );
  const deviceId = deviceIdMatch ? deviceIdMatch[1] : null;

  const navItems = [
    { label: 'Dashboard', to: '/dashboard', icon: <FaTachometerAlt /> },
    { label: 'Devices', to: '/devices', icon: <MdDevices /> },
    { label: 'Analytics', to: '/analytics', icon: <FaChartLine /> },
    { label: 'AI Assistant', to: '/ai', icon: <FaRobot /> },
    ...(deviceId
      ? [
          {
            label: 'Create Telemetry',
            to: `/create-telemetry/${deviceId}`,
            icon: <FaDatabase />,
          },
        ]
      : []),
  ];

  return (
    <aside
      className={clsx(
        'bg-white text-gray-600 fixed top-14 h-screen transition-all duration-300 ease-in-out border-r border-gray-200',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
                <MdElectricBolt className="text-white text-lg" />
              </div>
              <span className="font-medium text-gray-700">
                Smart Home Monitoring
              </span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-gray-600 focus:outline-none ml-auto"
            aria-label="Toggle Sidebar"
          >
            {collapsed ? (
              <FaAngleDoubleRight size={16} />
            ) : (
              <FaAngleDoubleLeft size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      {!collapsed && (
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Navigation
          </h3>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={clsx(
                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm',
                        isActive
                          ? 'bg-cyan-100 text-cyan-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
                      )}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}

      {/* System Status Section */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 mt-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Connected Devices</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Usage</span>
              <span className="text-sm font-semibold text-cyan-600">1.2kW</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Monthly Cost</span>
              <span className="text-sm font-semibold text-green-600">$187</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Section */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center gap-2">
            <FaHome className="text-sm" />
            <div className="text-xs">
              <div className="font-medium">Smart Home</div>
              <div className="text-gray-300">Energy Monitoring</div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed State */}
      {collapsed && (
        <div className="p-2">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={clsx(
                        'flex items-center justify-center p-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-cyan-100 text-cyan-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
                      )}
                      title={item.label}
                    >
                      <span className="text-lg">{item.icon}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </aside>
  );
}
