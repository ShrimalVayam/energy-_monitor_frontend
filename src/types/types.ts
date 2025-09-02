export type TelemetryEntry = {
  deviceId: number;
  energyWatts: number;
  timestamp: string;
};

export type Device = {
  id: string;
  name: string;
  type: string;
};

export interface TooltipPayload {
  value: number;
  name: string;
  color?: string;
  payload?: unknown;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export interface PieDataItem {
  name: string;
  value: number;
}
