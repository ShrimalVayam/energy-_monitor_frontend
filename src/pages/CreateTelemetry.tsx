import { useState, useRef } from 'react';
import { FiUploadCloud, FiFileText, FiX } from 'react-icons/fi';
import Papa from 'papaparse';
import { uploadTelemetryData } from '../services/deviceService';
import type { TelemetryEntry } from '../types/types';
import { useParams } from 'react-router-dom';
import { SidebarLayout } from '../components';
import clsx from 'clsx';

export default function CreateTelemetry() {
  const [file, setFile] = useState<File | null>(null);
  const [entries, setEntries] = useState<TelemetryEntry[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams<{ id: string }>();

  const parseCsv = (text: string) => {
    Papa.parse<TelemetryEntry>(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const filtered = results.data.filter(
          (entry) => String(entry.deviceId) === id
        );
        setEntries(filtered);
      },
    });
  };

  const parseJson = (text: string) => {
    const parsed = JSON.parse(text as string);
    if (parsed.entries) {
      const filtered = parsed.entries.filter(
        (entry: TelemetryEntry) => String(entry.deviceId) === id
      );
      setEntries(filtered);
    } else {
      alert('Invalid JSON format: "entries" array not found.');
    }
  };

  const processFile = (selectedFile: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string | undefined;
      if (!content) return;
      try {
        if (
          selectedFile.type === 'application/json' ||
          selectedFile.name.endsWith('.json')
        ) {
          parseJson(content);
        } else if (
          selectedFile.type === 'text/csv' ||
          selectedFile.name.endsWith('.csv')
        ) {
          parseCsv(content);
        } else {
          alert('Unsupported file type. Use .json or .csv.');
        }
      } catch (error) {
        console.error('Parsing error:', error);
        alert('Failed to parse the file.');
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    processFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    processFile(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  const handleUpload = async () => {
    if (!entries || entries.length === 0) {
      alert('No data to upload.');
      return;
    }
    setIsSubmitting(true);
    try {
      const uploadResponse = await uploadTelemetryData(entries);
      if (uploadResponse) {
        alert('Telemetry data sent successfully!');
        setFile(null);
        setEntries(null);
        if (inputRef.current) inputRef.current.value = '';
      } else {
        alert('Failed to send telemetry data.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading data.');
    }
    setIsSubmitting(false);
  };

  const removeFile = () => {
    setFile(null);
    setEntries(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const parsedCount = entries?.length ?? 0;

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto mt-12">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
                <FiUploadCloud size={18} />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Upload Telemetry Data
                </h2>
                <p className="text-xs text-slate-400">
                  Supported formats: JSON or CSV filtered by deviceId = {id}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {/* Dropzone */}
            <label
              htmlFor="file-upload"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={clsx(
                'flex flex-col items-center justify-center w-full h-44 rounded-xl cursor-pointer transition',
                'border-2 border-dashed',
                dragActive
                  ? 'border-cyan-400 bg-slate-800/40'
                  : 'border-slate-600/70 bg-slate-800/30 hover:bg-slate-800/40'
              )}
            >
              <FiUploadCloud className="text-4xl text-cyan-400 mb-2" />
              <p className="text-sm text-slate-200 font-medium">
                Click to browse or drag & drop
              </p>
              <p className="text-xs text-slate-400">.json or .csv only</p>
              <input
                id="file-upload"
                ref={inputRef}
                type="file"
                accept=".json,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* File info */}
            {file && (
              <div className="mt-5 rounded-xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-sm text-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/60">
                      <FiFileText className="text-slate-300" />
                    </span>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024).toFixed(2)} KB • Parsed entries:{' '}
                        {parsedCount}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-slate-400 hover:text-white rounded-md p-1"
                    aria-label="Remove file"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-slate-700/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={removeFile}
              className="rounded-md bg-slate-700/60 text-slate-200 px-4 py-2 text-sm hover:bg-slate-700 transition border border-slate-600/60 disabled:opacity-50"
              disabled={!file && !entries}
            >
              Clear
            </button>
            <button
              onClick={handleUpload}
              disabled={isSubmitting || !entries || parsedCount === 0}
              className="rounded-md bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/10 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Uploading...' : 'Upload Telemetry Data'}
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
