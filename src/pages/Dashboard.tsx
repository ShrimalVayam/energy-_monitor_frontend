import { useState, useEffect } from 'react';
import { SidebarLayout } from '../components';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { getDevices } from '../services/deviceService';
import Chance from 'chance';
import { RecentActivity } from '../components/RecentActivity/RecentActivity';
import Cards from '../components/StatCard/StatCard';

const chance = new Chance();

type Device = {
  id: string;
  name: string;
  type: string;
};

export default function Dashboard() {
  const [powerUsage, setPowerUsage] = useState<
    { time: string; usage: number }[]
  >([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usageData = Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      usage: chance.floating({ min: 1, max: 10, fixed: 2 }),
    }));
    setPowerUsage(usageData);

    const fetchDevices = async () => {
      try {
        const res = await getDevices();
        setDevices(res);
      } catch (err) {
        console.error('Error fetching devices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (
    <SidebarLayout>
      <div className="bg-slate-900 h-full text-white px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Energy Dashboard
          </h1>
          <p className="text-slate-400">
            Monitor your smart home's energy consumption in real-time
          </p>
        </div>

        {/* KPI Cards (reusable StatCard) */}
        <div>
          <Cards devices={devices} />
        </div>

        {/* Chart + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {/* Energy Chart */}
          <div className="rounded-xl border h-96 border-slate-700/60 bg-slate-800/40 px-5 py-4 shadow-lg col-span-2">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              24-Hour Energy Consumption
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={powerUsage}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="usageGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3547" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  stroke="#495568"
                  tickMargin={8}
                />
                <YAxis
                  stroke="#495568"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#usageGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <RecentActivity devices={devices} loading={loading} chance={chance} />
        </div>

        {/* Energy Tips */}
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 px-5 py-4 shadow-lg">
          <h3 className="text-base font-semibold mb-3">Energy Tips</h3>
          <div className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-800/40 px-4 py-3">
            <span className="text-yellow-400 text-base">💡</span>
            <p className="text-[13px] leading-relaxed text-slate-300">
              Your AC is using {chance.integer({ min: 10, max: 30 })}% more
              energy than average. Consider adjusting the temperature.
            </p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
