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
        setErrorMessage(err);
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

  const userId = profile?.id;
  const userName = profile?.name || "No disponible";
  const userLastName = profile?.lastname;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Mi Perfil
        </h1>
      </header>

      {error && (
        <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>
      )}

      <section className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              ID
            </label>
            <p className="text-lg text-gray-800 font-semibold">{userId}</p>
          </div>

          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Nombre
            </label>
            <p className="text-lg text-gray-800 font-semibold">{userName}</p>
          </div>

          <div className="pb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Apellido
            </label>
            <p className="text-lg text-gray-800 font-semibold">
              {userLastName}
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition disabled:bg-gray-400"
          >
            {isLoggingOut ? "Cerrando sesión..." : "Logout"}
          </button>
          <Link
            to={"/home"}
            className="flex-1 border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-50 transition align-center text-center"
          >
            Volver
          </Link>
        </div>
      </section>
    </div>
  );
};
