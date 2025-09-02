import { useState } from 'react';
import { createDevice } from '../services/deviceService';
import { deviceSchema } from '../schemas/validation/deviceSchema';
import { useNavigate } from 'react-router-dom';
// import { Button, InputField } from '../components';
import { FiX } from 'react-icons/fi';

export default function CreateDevice() {
  const [formData, setFormData] = useState({ name: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { error: joiError } = deviceSchema.validate(formData, {
      abortEarly: false,
    });

    if (joiError) {
      const fieldErrors: { [key: string]: string } = {};
      joiError.details.forEach((detail) => {
        if (detail.path[0])
          fieldErrors[detail.path[0] as string] = detail.message;
      });
      setValidationErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await createDevice(formData);
      setSuccess(true);
      setFormData({ name: '', type: '' });
      setValidationErrors({});
    } catch (err) {
      setError('Failed to create device');
      console.error(err);
    }
    setLoading(false);
  };

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-400">
              +
            </span>
            <h2 className="text-xl font-semibold text-white">Add New Device</h2>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-white rounded-md p-1.5"
            onClick={() => navigate('/dashboard')}
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal body */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          {success && (
            <p className="mb-4 rounded-md bg-emerald-500/15 px-3 py-2 text-emerald-300 text-sm border border-emerald-500/30">
              Device created successfully!
            </p>
          )}
          {error && (
            <p className="mb-4 rounded-md bg-rose-500/15 px-3 py-2 text-rose-300 text-sm border border-rose-500/30">
              {error}
            </p>
          )}

          {/* 2-column grid like the reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Device Name (real field) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Device Name <span className="text-cyan-400">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Living Room AC"
                className="w-full rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 px-3 py-2.5 outline-none"
              />
              {validationErrors.name && (
                <p className="text-rose-400 text-xs mt-1">
                  {validationErrors.name}
                </p>
              )}
            </div>

            {/* Device Type (real field) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Device Type <span className="text-cyan-400">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-md bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 px-3 py-2.5 outline-none appearance-none"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="sensor">Sensor</option>
                <option value="appliance">Appliance</option>
                <option value="meter">Meter</option>
              </select>
              {validationErrors.type && (
                <p className="text-rose-400 text-xs mt-1">
                  {validationErrors.type}
                </p>
              )}
            </div>

            {/* Placeholder (disabled) fields to match the UI, not submitted */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Room *
              </label>
              <input
                disabled
                placeholder="e.g., Living Room"
                className="w-full rounded-md bg-slate-800/60 text-slate-400 placeholder-slate-500 border border-slate-700/60 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Rated Power (W)
              </label>
              <input
                disabled
                placeholder="e.g., 1500"
                className="w-full rounded-md bg-slate-800/60 text-slate-400 placeholder-slate-500 border border-slate-700/60 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Brand
              </label>
              <input
                disabled
                placeholder="e.g., Samsung"
                className="w-full rounded-md bg-slate-800/60 text-slate-400 placeholder-slate-500 border border-slate-700/60 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Model
              </label>
              <input
                disabled
                placeholder="e.g., AC-2024"
                className="w-full rounded-md bg-slate-800/60 text-slate-400 placeholder-slate-500 border border-slate-700/60 px-3 py-2.5"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Installation Date
              </label>
              <div className="relative">
                <input
                  disabled
                  placeholder="mm/dd/yyyy"
                  className="w-full rounded-md bg-slate-800/60 text-slate-400 placeholder-slate-500 border border-slate-700/60 px-3 py-2.5 pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  📅
                </span>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-700/60 pt-5">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="rounded-md bg-slate-700/60 text-slate-200 px-4 py-2.5 text-sm hover:bg-slate-700 transition border border-slate-600/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/10 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Add Device'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
