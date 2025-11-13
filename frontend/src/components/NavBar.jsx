import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const NavBar = ({ authStatus, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        onLogout();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Nombre */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              TaskApp
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {authStatus === "authenticated" ? (
              <>
                <Link
                  to="/home"
                  className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Home
                </Link>
                <Link
                  to="/tasks"
                  className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Tasks
                </Link>
                <Link
                  to="/profile"
                  className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {authStatus === "authenticated" ? (
              <>
                <Link
                  to="/home"
                  className="block hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/tasks"
                  className="block hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Tasks
                </Link>
                <Link
                  to="/profile"
                  className="block hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
