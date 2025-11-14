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
  const neonPurpleStyle = {
    color: "#a855f7", // Purple 400 - Color base
    textShadow: `
      0 0 7px #7e22ce,    /* Purple 600: Sombra suave */
      0 0 20px #a855f7,   /* Purple 400: Sombra intensa */
      0 0 40px #c084fc     /* Purple 500: Brillo externo */
    `,
  };

  const logoutNeonStyle = {
    color: "black",
    textShadow: `
      0 0 7px #7e22ce,
      0 0 20px #a855f7,
      0 0 40px #c084fc
    `,
  };
  return (
    <nav className="bg-gray-1000 text-gray-100 shadow-lg border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Nombre */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="hidden md:inline-block text-purple-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-purple-900/40 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
              style={neonPurpleStyle}
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
                  className="hidden md:inline-block text-purple-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-purple-900/40 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
                  style={neonPurpleStyle}
                >
                  Home
                </Link>
                <Link
                  to="/tasks"
                  className="hidden md:inline-block text-purple-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-purple-900/40 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
                  style={neonPurpleStyle}
                >
                  Tasks
                </Link>
                <Link
                  to="/profile"
                  className="hidden md:inline-block text-purple-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-purple-900/40 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
                  style={neonPurpleStyle}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-purple-700/50 hidden md:inline-block text-purple-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-purple-900/40 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
                  style={logoutNeonStyle}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:inline-block text-purple-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-purple-900/40 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
                  style={neonPurpleStyle}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                   className="bg-purple-700/50 hidden md:inline-block text-purple-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-purple-900/40 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
                  style={logoutNeonStyle}
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
                  className="hidden md:inline-block bg-purple text-purple-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-purple-900 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
                  style={neonPurpleStyle}
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
