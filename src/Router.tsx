import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import { useAuth } from './context/AuthContext';
import {
  CreateDevice,
  CreateTelemetry,
  DeviceDetail,
  Devices,
  Login,
  Register,
  Chat,
  Dashboard,
  Analytics,
} from './pages';

export default function AppRoutes() {
  const { token } = useAuth();
  return (
    <Router>
      {token && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/devices/:id" element={<DeviceDetail />} />
        <Route path="/create-device" element={<CreateDevice />} />
        <Route path="/create-telemetry/:id" element={<CreateTelemetry />} />
        <Route path="/ai" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}
