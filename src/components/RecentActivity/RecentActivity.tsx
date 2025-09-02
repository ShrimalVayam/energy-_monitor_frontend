import { FiClock } from 'react-icons/fi';
import clsx from 'clsx';

type Device = { id: string; name: string; type: string };
type Status = 'active' | 'inactive';
type DeviceWithStatus = Device & { status?: Status };

type RecentActivityProps = {
  devices: DeviceWithStatus[];
  loading: boolean;
  chance: Chance.Chance;
};

const getStatus = (w: number): Status =>
  w === 0 ? 'inactive' : Math.random() < 0.3 ? 'active' : 'inactive';

function StatusBadge({ status }: { status: Status }) {
  const active = status === 'active';
  return (
    <span
      className={clsx(
        'mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5',
        'text-[12px] font-bold leading-none ring-1',
        active
          ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
          : 'bg-slate-500/10 text-slate-400 ring-slate-500/20'
      )}
    >
      <span
        className={clsx(
          'h-1.5 w-1.5 rounded-full',
          active ? 'bg-emerald-400' : 'bg-slate-400'
        )}
      />
      {active ? 'active' : 'inactive'}
    </span>
  );
}

export function RecentActivity({
  devices,
  loading,
  chance,
}: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 bg-clip-padding backdrop-blur-sm px-6 py-5 shadow-lg ring-1 ring-black/10">
      <h3 className="mb-5 flex items-center gap-2 text-2xl font-bold leading-snug tracking-tight">
        {/* Larger and bolder-looking icon */}
        <FiClock className="h-6 w-6 stroke-current stroke-2 text-cyan-400" />
        Recent Activity
      </h3>

      {loading ? (
        <p className="text-slate-300 text-lg font-bold">Loading devices...</p>
      ) : (
        <ul className="divide-y divide-slate-700/40">
          {devices.map((device) => {
            const watts: number = chance.integer({ min: 0, max: 2000 });
            const status: Status = getStatus(watts);

            return (
              <li
                key={device.id}
                className="grid grid-cols-[1fr_auto] items-center gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                {/* Left: name + room */}
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold tracking-tight text-slate-100">
                    {device.name}
                  </p>
                  <p className="mt-0.5 text-lg leading-snug font-bold text-slate-400">
                    {device.type}
                  </p>
                </div>

                {/* Right: watts + status */}
                <div className="flex flex-col items-end">
                  <span className="tabular-nums text-[14px] font-bold text-cyan-400">
                    {watts}W
                  </span>
                  <StatusBadge status={status} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
