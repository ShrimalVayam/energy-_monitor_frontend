import React from 'react';
import { FiZap, FiCpu, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import Chance from 'chance';

const chance = new Chance();

interface CardsProps {
  devices: unknown[];
}

const Cards: React.FC<CardsProps> = ({ devices }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {/* Current Usage */}
      <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-6 shadow-lg min-h-[200px]">
        <div className="flex items-center justify-between mb-3">
          <FiZap className="text-cyan-400 text-2xl" />
          <span className="text-rose-400 text-xs font-medium">
            ▼ {chance.integer({ min: 5, max: 20 })}%
          </span>
        </div>
        <p className="text-sm text-slate-400">Current Usage</p>
        <h2 className="text-3xl font-bold text-white">
          {chance.floating({ min: 4, max: 7, fixed: 2 })} kW
        </h2>
      </div>

      {/* Active Devices */}
      <div className="rounded-xl bg-gradient-to-br from-slate-900 to-teal-900 px-6 py-6 shadow-lg min-h-[200px]">
        <div className="flex items-center justify-between mb-3">
          <FiCpu className="text-emerald-400 text-2xl" />
          <span className="text-emerald-400 text-xs font-medium">
            +{chance.integer({ min: 1, max: 3 })} new
          </span>
        </div>
        <p className="text-sm text-slate-400">Active Devices</p>
        <h2 className="text-3xl font-bold text-white">{devices.length}</h2>
      </div>

      {/* Avg per Device */}
      <div className="rounded-xl bg-gradient-to-br from-blue-800 to-blue-950 px-6 py-6 shadow-lg min-h-[200px]">
        <div className="flex items-center justify-between mb-3">
          <FiTrendingUp className="text-purple-200 text-2xl" />
        </div>
        <p className="text-sm text-slate-200">Avg per Device</p>
        <h2 className="text-3xl font-bold text-white">
          {chance.floating({ min: 1.0, max: 2.0, fixed: 2 })} kW
        </h2>
      </div>

      {/* Monthly Cost */}
      <div className="rounded-xl bg-gradient-to-br from-gray-900 to-neutral-800 px-6 py-6 shadow-lg min-h-[200px]">
        <div className="flex items-center justify-between mb-3">
          <FiDollarSign className="text-cyan-400 text-2xl" />
          <span className="text-rose-400 text-xs font-medium">
            ▼ {chance.integer({ min: 5, max: 15 })}%
          </span>
        </div>
        <p className="text-sm text-slate-400">Monthly Cost</p>
        <h2 className="text-3xl font-bold text-white">
          ${chance.integer({ min: 400, max: 700 })}
        </h2>
      </div>
    </div>
  );
};

export default Cards;
