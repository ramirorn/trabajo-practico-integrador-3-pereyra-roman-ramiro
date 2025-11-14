import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../components/Loading";

export const Profile = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      setError("");
      try {
        const profileResponse = await fetch(
          "http://localhost:3000/api/profile",
          {
            credentials: "include",
          }
        );
        if (!profileResponse.ok) {
          throw new Error("No se pudo obtener el perfil");
        }
        const profileBody = await profileResponse.json().catch(() => null);
        setProfile(profileBody?.user || profileBody || null);
      } catch (err) {
        console.log(err);
        setError(err.message); // Corregido: setErrorMessage no existe
      } finally {
        setIsLoading(false);
      }
    };
    loadUserProfile();
  }, []);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const logoutResponse = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!logoutResponse.ok) {
        throw new Error("No se pudo cerrar la sesión");
      }
      onLogout();
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoggingOut(false);
    }
  };
  if (isLoading) return <Loading />;
  const userId = profile?.id || "---";
  const userName = profile?.name || "---";
  const userLastName = profile?.lastname || "---";
  const neonTitleStyle = {
    color: "#4ade80",
    textShadow: `
      0 0 7px #16a34a,
      0 0 20px #4ade80,
      0 0 40px #22c55e
    `,
  };

  const neonAccentStyle = {
    color: "#fb923c",
    textShadow: `
      0 0 6px #c2410c,
      0 0 18px #fb923c,
      0 0 36px #f97316
    `,
  };

  const neonButtonStyle = {
    boxShadow: "0 0 8px #fb923c, 0 0 20px #fb923c",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <section className="bg-gray-900/80 border border-gray-800 backdrop-blur-sm rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-gray-200">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold" style={neonTitleStyle}>
              Mi Perfil
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Información de la cuenta
            </p>
          </header>

          {error && (
            <div className="mb-4 text-sm text-red-300 bg-red-950/30 border border-red-800 p-3 rounded">
              {String(error)}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <label className="block text-xs text-gray-400 mb-1 uppercase">
                ID
              </label>
              <p className="text-lg font-mono text-gray-100">{userId}</p>
            </div>

            <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <label className="block text-xs text-gray-400 mb-1 uppercase">
                Nombre
              </label>
              <p className="text-lg text-gray-100 font-semibold">{userName}</p>
            </div>

            <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <label className="block text-xs text-gray-400 mb-1 uppercase">
                Apellido
              </label>
              <p className="text-lg text-gray-100 font-semibold">
                {userLastName}
              </p>
            </div>
          </div>

          <div className="mb-6 text-center">
            <p className="text-sm" style={neonAccentStyle}>
              Datos protegidos · Sesión segura
            </p>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              style={neonButtonStyle}
              className="flex-1 bg-gradient-to-r from-rose-600 to-red-500 text-white font-bold py-3 px-4 rounded-lg hover:brightness-105 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
            </button>

            <Link
              to={"/home"}
              className="flex-1 border border-gray-700 text-gray-300 font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
            >
              Volver
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
