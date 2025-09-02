import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between bg-slate-800 text-white items-center px-4 py-3 shadow w-full">
        <h1 className="text-xl font-bold">Smart Energy Monitor</h1>
        <nav>
          <Button
            className="px-3 py-1 hover:bg-slate-600 bg-emerald-600"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>
      </header>

      {/* Spacer div to push content down */}
      <div className="h-16"></div>
    </>
  );
}
