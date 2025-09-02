import { JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDevices } from '../services/deviceService';
import type { Device } from '../types/types';
import { SidebarLayout } from '../components';
import {
  FiWifi,
  FiWifiOff,
  FiSettings,
  FiPower,
  FiWind,
  FiTv,
  FiSun,
  FiSpeaker,
  FiPlus,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import CreateDevice from './CreateDevice';

const getDeviceIcon = (type: string): JSX.Element => {
  const iconMap: { [key: string]: IconType } = {
    ac: FiWind,
    'air conditioner': FiWind,
    tv: FiTv,
    television: FiTv,
    light: FiSun,
    bulb: FiSun,
    lamp: FiSun,
    speaker: FiSpeaker,
    default: FiPower,
  };

  const IconComponent = iconMap[type.toLowerCase()] || iconMap['default'];
  return <IconComponent size={28} className="text-cyan-400" />;
};

const getDeviceLocation = (device: Device): string => {
  const name = device.name.toLowerCase();

  if (name.includes('living room') || name.includes('living'))
    return 'Living Room';
  if (name.includes('bedroom') || name.includes('bed')) return 'Bedroom';
  if (name.includes('kitchen')) return 'Kitchen';
  if (name.includes('bathroom') || name.includes('bath')) return 'Bathroom';
  if (name.includes('office') || name.includes('study')) return 'Office';

  const typeDefaults: { [key: string]: string } = {
    ac: 'Living Room',
    'air conditioner': 'Living Room',
    tv: 'Living Room',
    television: 'Living Room',
    light: 'Bedroom',
    bulb: 'Bedroom',
    lamp: 'Bedroom',
    speaker: 'Kitchen',
  };

  return typeDefaults[device.type.toLowerCase()] || 'Home';
};

const getDeviceStats = () => {
  return {
    currentUsage: '1650.5',
    ratedPower: '1800',
    isConnected: true,
    isActive: false,
  };
};

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [addDevice, setAddDevice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await getDevices();
        setDevices(fetchedDevices);
      } catch (error) {
        console.error('Failed to fetch devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleToggleDevice = async (deviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Toggling device ${deviceId}`);
  };

  const handleSettings = (deviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/devices/${deviceId}/settings`);
  };

  const handleAddDevice = () => {
    setAddDevice(true);
  };

  return (
    <SidebarLayout>
      <div className="bg-slate-900 min-h-screen text-white p-6 ">
        <div className="flex items-center justify-between py-4">
          <h2 className="text-2xl font-bold  text-white">My Devices</h2>
          <button
            onClick={handleAddDevice}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-white font-medium shadow-lg shadow-emerald-500/10 hover:from-cyan-400 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-0 active:scale-[0.98] transition"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/15">
              <FiPlus className="text-white" size={16} />
            </span>
            <span>Add Device</span>
          </button>
          {addDevice && <CreateDevice />}
        </div>

        {devices.length === 0 ? (
          <p className="text-slate-400">No devices found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {devices.map((device) => {
              const location = getDeviceLocation(device);
              const stats = getDeviceStats();

              return (
                <div
                  key={device.id}
                  onClick={() => navigate(`/devices/${device.id}`)}
                  className="bg-slate-800 rounded-2xl p-5 border border-slate-700/80 hover:border-slate-600/80 transition-all duration-200 cursor-pointer hover:bg-slate-750 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.type)}
                      <div>
                        <h3 className="text-lg font-semibold text-white leading-tight mb-0.5">
                          {device.name}
                        </h3>
                        <p className="text-sm text-slate-400">{location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {stats.isConnected ? (
                        <FiWifi className="text-green-400" size={16} />
                      ) : (
                        <FiWifiOff className="text-red-400" size={16} />
                      )}

                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          stats.isActive
                            ? 'bg-green-600/80 text-green-100'
                            : 'bg-amber-600/80 text-amber-100'
                        }`}
                      >
                        {stats.isActive ? 'active' : 'inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium">
                        Current Usage
                      </p>
                      <p className="text-xl font-bold text-white">
                        {stats.currentUsage}
                        <span className="text-sm font-normal text-slate-400 ml-1">
                          W
                        </span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium">
                        Rated Power
                      </p>
                      <p className="text-xl font-bold text-white">
                        {stats.ratedPower}
                        <span className="text-sm font-normal text-slate-400 ml-1">
                          W
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={(e) => handleSettings(device.id, e)}
                      className="flex items-center justify-center gap-2 bg-white text-slate-800 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <FiSettings size={14} />
                      Settings
                    </button>

                    <button
                      onClick={(e) => handleToggleDevice(device.id, e)}
                      className="flex items-center justify-center gap-2 bg-white text-slate-800 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <FiPower size={14} />
                      {stats.isActive ? 'Turn Off' : 'Turn On'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
