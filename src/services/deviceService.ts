import { deviceApi } from '.';
import type { TelemetryEntry } from '../types/types';

export const getDevices = async () => {
  const devicesResponse = await deviceApi.get('/devices');
  return devicesResponse.data.devices;
};

export const createDevice = async (device: { name: string; type: string }) => {
  const createDeviceResponse = await deviceApi.post('/device/create', device);
  return createDeviceResponse.data;
};
export const fetchTelemetryData = async (deviceId: string, days: number) => {
  const telemetryResponse = await deviceApi.get(
    `/usage/${deviceId}?days=${days}`
  );
  return telemetryResponse.data;
};

export const uploadTelemetryData = async (entries: TelemetryEntry[]) => {
  const uploadResponse = await deviceApi.post('/data/create', { entries });
  return uploadResponse.data;
};
