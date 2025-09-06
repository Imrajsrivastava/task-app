import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout,setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/dashboard" className="font-semibold">Dashboard</Link>
        <Link to="/tasks/new">Add Task</Link>
      </div>
      <div>
        {user && (
          <>
            <span className="mr-4">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
