import { AuthProvider } from './context/AuthContext';
import AppRoutes from './Router';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
