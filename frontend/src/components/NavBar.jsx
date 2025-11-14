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
    <nav className="bg-gray-1000 text-gray-100 shadow-lg border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Nombre */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-purple-600 hover:text-purple-900 transition-colors duration-200"
            >
              TaskApp
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
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
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {authStatus === "authenticated" ? (
              <>
                <Link
                  to="/home"
                  className="text-purple-600 hover:bg-purple-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/tasks"
                  className="text-purple-600 hover:bg-purple-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Tasks
                </Link>
                <Link
                  to="/profile"
                  className="text-purple-600 hover:bg-purple-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-purple-600 hover:bg-purple-900 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 absolute bg-gray-900 left-0 right-0 shadow-lg border-b border-gray-800">
            {authStatus === "authenticated" ? (
              <>
                <Link
                  to="/home"
                  className="block text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/tasks"
                  className="block text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Tasks
                </Link>
                <Link
                  to="/profile"
                  className="block text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left bg-red-700 hover:bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
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
