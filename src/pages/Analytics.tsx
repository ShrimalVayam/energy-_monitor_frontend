import { useState, useEffect } from 'react';
import Chance from 'chance';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { SidebarLayout } from '../components';
import { tabs, weekDays } from '../utils/constants';
import type { CustomTooltipProps, PieDataItem } from '../types/types';

// Initialize Chance
const chance = new Chance();

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [usageData, setUsageData] = useState<{ time: string; usage: number }[]>(
    []
  );
  const [deviceData, setDeviceData] = useState<PieDataItem[]>([]);
  const [roomData, setRoomData] = useState<PieDataItem[]>([]);
  const [trendData, setTrendData] = useState<{ day: string; usage: number }[]>(
    []
  );

  // Generate fake data on component mount
  useEffect(() => {
    // 24-hour usage pattern
    const newUsageData = Array.from({ length: 24 }).map((_, i) => {
      const hour = i;
      let usage = 0;

      // Create a realistic pattern with peaks
      if (hour >= 6 && hour <= 9) {
        usage = chance.floating({ min: 1.2, max: 2.5 });
      } else if (hour >= 16 && hour <= 21) {
        usage = chance.floating({ min: 1.5, max: 3 });
      } else if (hour >= 22 || hour <= 5) {
        usage = chance.floating({ min: 0.2, max: 0.6 });
      } else {
        usage = chance.floating({ min: 0.6, max: 1.2 });
      }

      return {
        time: `${i.toString().padStart(2, '0')}:00`,
        usage: parseFloat(usage.toFixed(1)),
      };
    });
    setUsageData(newUsageData);

    // Devices
    setDeviceData([
      { name: 'Washing Machine', value: chance.integer({ min: 10, max: 50 }) },
      { name: 'Living Room AC', value: chance.integer({ min: 20, max: 60 }) },
      {
        name: 'Kitchen Dishwasher',
        value: chance.integer({ min: 5, max: 40 }),
      },
      { name: 'Home Office Setup', value: chance.integer({ min: 5, max: 30 }) },
      {
        name: 'Kitchen Refrigerator',
        value: chance.integer({ min: 5, max: 15 }),
      },
      { name: 'Dining Room Lights', value: chance.integer({ min: 1, max: 5 }) },
      { name: 'Master Bedroom TV', value: chance.integer({ min: 0, max: 10 }) },
      { name: 'Basement Heater', value: chance.integer({ min: 0, max: 20 }) },
    ]);

    // Rooms
    setRoomData([
      {
        name: 'Living Room',
        value: chance.floating({ min: 10, max: 40, fixed: 1 }),
      },
      {
        name: 'Kitchen',
        value: chance.floating({ min: 10, max: 35, fixed: 1 }),
      },
      {
        name: 'Master Bedroom',
        value: chance.floating({ min: 0, max: 20, fixed: 1 }),
      },
      {
        name: 'Basement',
        value: chance.floating({ min: 0, max: 15, fixed: 1 }),
      },
      {
        name: 'Utility Room',
        value: chance.floating({ min: 10, max: 45, fixed: 1 }),
      },
      {
        name: 'Home Office',
        value: chance.floating({ min: 5, max: 25, fixed: 1 }),
      },
      {
        name: 'Dining Room',
        value: chance.floating({ min: 0, max: 10, fixed: 1 }),
      },
    ]);

    // Weekly trends

    setTrendData(
      weekDays.map((day) => ({
        day,
        usage: chance.integer({ min: 5, max: 20 }),
      }))
    );
  }, []);

  const COLORS = [
    '#00CFFF',
    '#00E396',
    '#FF4560',
    '#FEB019',
    '#775DD0',
    '#FF7F0E',
    '#1F77B4',
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm border border-gray-600 rounded-lg p-3 text-white">
          <p className="text-gray-300 text-sm mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="font-semibold"
              style={{ color: entry.color || '#00CFFF' }}
            >
              {entry.name}: {entry.value.toFixed(2)}{' '}
              {entry.name === 'usage' ? 'kWh' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Pie chart labels
  const renderPieLabel = ({
    name,
    percent,
  }: {
    name: string;
    percent?: number;
  }) => {
    return `${name} ${((percent || 0) * 100).toFixed(0)}%`;
  };

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto p-6 text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-1">Energy Analytics</h1>
        <p className="text-blue-200/80 mb-6">
          Deep insights into your energy consumption patterns
        </p>

        {/* Tabs */}
        <div className="flex space-x-2 sm:space-x-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 sm:px-4 text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full">
                <p className="text-gray-400 text-sm">Total Usage</p>
                <h2 className="text-2xl font-bold">
                  {chance.floating({ min: 100, max: 200, fixed: 1 })} kWh
                </h2>
                <p className="text-green-400 text-xs mt-1">
                  +{chance.integer({ min: 1, max: 15 })}% from last week
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full">
                <p className="text-gray-400 text-sm">Peak Usage</p>
                <h2 className="text-2xl font-bold">
                  {chance.floating({ min: 1, max: 3, fixed: 1 })} kW
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  at {chance.hour()}:00 today
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full">
                <p className="text-gray-400 text-sm">Avg Daily</p>
                <h2 className="text-2xl font-bold">
                  {chance.floating({ min: 10, max: 25, fixed: 1 })} kWh
                </h2>
                <p className="text-yellow-400 text-xs mt-1">
                  +{chance.integer({ min: 1, max: 10 })}% from target
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full">
                <p className="text-gray-400 text-sm">Efficiency</p>
                <h2 className="text-2xl font-bold">
                  {chance.integer({ min: 70, max: 95 })}%
                </h2>
                <p className="text-green-400 text-xs mt-1">
                  +{chance.integer({ min: 1, max: 5 })}% this month
                </p>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-gray-800 p-4 rounded-lg h-96 border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">24 Hour Usage Pattern</h3>
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient
                      id="usageGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00CFFF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00CFFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="time"
                    stroke="#9CA3AF"
                    fontSize={10}
                    tickCount={12}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={10}
                    domain={[0, 8]}
                    ticks={[0, 2, 4, 6, 8]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#00CFFF"
                    strokeWidth={2}
                    fill="url(#usageGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* By Device */}
        {activeTab === 'By Device' && (
          <div className="bg-gray-800 p-6 rounded-lg h-[450px] border border-gray-700">
            <h3 className="font-bold mb-4 text-lg">
              Energy Consumption by Device (Daily kWh)
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#00CFFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* By Room */}
        {activeTab === 'By Room' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg h-96 border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">Consumption by Room</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roomData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    labelLine={false}
                    label={renderPieLabel}
                    fontSize={12}
                  >
                    {roomData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="font-bold mb-4 text-lg">
                Room Details (Daily kWh)
              </h3>
              <ul className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {roomData.map((room, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center py-2 px-3 rounded-md bg-gray-700/50 border-b border-gray-600 hover:bg-gray-600/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[i % COLORS.length],
                        }}
                      ></div>
                      <span className="text-sm">{room.name}</span>
                    </div>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: COLORS[i % COLORS.length] }}
                    >
                      {room.value.toFixed(1)} kWh
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Trends */}
        {activeTab === 'Trends' && (
          <div className="bg-gray-800 p-6 rounded-lg h-96 border border-gray-700">
            <h3 className="font-bold mb-4 text-lg">Weekly Energy Trends</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 20]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="usage" fill="#00E396" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
