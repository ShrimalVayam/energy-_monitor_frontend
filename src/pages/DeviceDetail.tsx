import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTelemetryData } from '../services/deviceService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { SidebarLayout } from '../components';

type TelemetryEntry = {
  id: number;
  timestamp: string;
  energyWatts: number;
  deviceId: number;
  createdAt: string;
};

export default function DeviceDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<TelemetryEntry[]>([]);
  const [days, setDays] = useState<number>(7);

  useEffect(() => {
    if (!id) return;
    const fetchTelemetry = async () => {
      try {
        const telemetryResponse = await fetchTelemetryData(id, days);
        setData(telemetryResponse.telemetry);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTelemetry();
  }, [id, days]);

  return (
    <SidebarLayout>
      <main className="bg-slate-900 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8 text-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold leading-tight">
                Device Detail
              </h2>
              <p className="text-slate-400 text-sm">
                Telemetry overview for the last {days}{' '}
                {days === 1 ? 'day' : 'days'}
              </p>
            </div>

            {/* Days selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-300">Select Days:</label>
              <select
                className="bg-slate-800/60 text-white border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              >
                <option value={1}>1 Day</option>
                <option value={7}>7 Days</option>
                <option value={30}>30 Days</option>
              </select>
            </div>
          </div>

          {/* Chart Card */}
          <section className="rounded-xl border border-slate-700/60 bg-slate-800/40 shadow-lg px-5 py-4">
            {data.length === 0 ? (
              <p className="text-slate-400 text-center py-10">
                No telemetry data available.
              </p>
            ) : (
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a3547" />
                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={(str) =>
                        new Date(str).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })
                      }
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      stroke="#495568"
                      tickMargin={8}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      stroke="#495568"
                      width={48}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: 8,
                        color: '#e2e8f0',
                      }}
                      labelStyle={{ color: '#e2e8f0' }}
                      formatter={(v: any) => [`${v} W`, 'Energy']}
                      labelFormatter={(label) =>
                        new Date(label).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="energyWatts"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ r: 2, stroke: '#06b6d4', fill: '#06b6d4' }}
                      activeDot={{ r: 4, stroke: '#22d3ee', fill: '#22d3ee' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        </div>
      </main>
    </SidebarLayout>
  );
}
