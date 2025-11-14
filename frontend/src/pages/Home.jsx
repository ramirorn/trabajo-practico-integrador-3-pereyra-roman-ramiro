import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../components/Loading";

export const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const loadProfileAndTasks = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        try {
          const profileResponse = await fetch(
            "http://localhost:3000/api/profile",
            {
              credentials: "include",
            }
          );
          if (profileResponse.ok) {
            const profileBody = await profileResponse.json().catch(() => null);
            setUserProfile(profileBody?.user || profileBody || null);
          }
        } catch (err) {
          console.log(err);
        }
        const tasksResponse = await fetch(
          "http://localhost:3000/api/tasks-by-user",
          {
            credentials: "include",
          }
        );
        const tasksBody = await tasksResponse.json().catch(() => null);
        if (!tasksResponse.ok) {
          throw new Error(tasksBody?.message || "Error al obtener tareas");
        }
        const resolvedTasks = Array.isArray(tasksBody)
          ? tasksBody
          : tasksBody?.tasks || [];
        const totalTasks = resolvedTasks.length;
        const completedTasks = resolvedTasks.filter(
          (task) => task.is_completed === true
        ).length;
        const pendingTasks = totalTasks - completedTasks;
        setStats({
          total: totalTasks,
          completed: completedTasks,
          pending: pendingTasks,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfileAndTasks();
  }, []);
  if (isLoading) return <Loading />;
  const displayName = userProfile?.name || userProfile?.username || "Usuario";

  const neonGreenStyle = {
    color: "#4ade80", // Green 400 - Color base
    textShadow: `
      0 0 7px #16a34a,    /* Green 600: Sombra suave */
      0 0 20px #4ade80,   /* Green 400: Sombra intensa */
      0 0 40px #22c55e     /* Green 500: Brillo externo */
    `,
  };
  const neonBlueStyle = {
    color: "#3b82f6", // Blue 400 - Color base
    textShadow: `
      0 0 7px #1e40af,      
      0 0 20px #3b82f6,   
      0 0 40px #60a5fa     
    `,
  };

  const yellowNeonStyle = {
    color: "#facc15", // Yellow 400 - Color base
    textShadow: `
      0 0 7px #ca8a04,    /* Yellow 600: Sombra suave */
      0 0 20px #facc15,   /* Yellow 400: Sombra intensa */
      0 0 40px #eab308     /* Yellow 500: Brillo externo */
    `,
  };

  const neonRedStyle = {
    color: "#f87171", // Red 400 - Color base
    textShadow: `
      0 0 7px #b91c1c,    /* Red 600: Sombra suave */
      0 0 20px #f87171,   /* Red 400: Sombra intensa */
      0 0 40px #ef4444     /* Red 500: Brillo externo */
    `,
  };

  const neonOrangeStyle = {
    color: "#fb923c", // Orange 400 - Color base
    textShadow: `
      0 0 7px #c2410c,    /* Orange 600: Sombra suave */
      0 0 20px #fb923c,   /* Orange 400: Sombra intensa */
      0 0 40px #f97316     /* Orange 500: Brillo externo */
    `,
  };
  const neonOrangeinButtonStyle = {
    color: "#000000ff",
    textShadow: `
      0 0 7px #c2410c,    /* Orange 600: Sombra suave */
      0 0 20px #fb923c,   /* Orange 400: Sombra intensa */
      0 0 40px #f97316     /* Orange 500: Brillo externo */
    `,
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-200">
      <header className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-extrabold text-green-600 mb-2 tracking-tight border:4px solid green-900"
          style={neonRedStyle}
        >
          Bienvenido, {displayName}!
        </h1>
        <p className="text-lg text-green-600" style={neonRedStyle}>
          Este es tu resumen de tareas.
        </p>
      </header>

      {errorMessage && (
        <div className="mb-4 text-red-300 bg-red-950 border border-red-800 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Card Total */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
          <h3
            className="text-sm text-gray-400 uppercase tracking-wider"
            style={neonBlueStyle}
          >
            Total de Tareas
          </h3>
          <p
            className="mt-4 text-4xl font-bold text-white"
            style={neonBlueStyle}
          >
            {stats.total}
          </p>
          <p className="mt-2 text-xs text-white-500" style={neonBlueStyle}>
            Es el numero total de tus tareas
          </p>
        </div>

        {/* Card Completadas */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
          <h3
            className="text-sm text-gray-400 uppercase tracking-wider"
            style={neonGreenStyle}
          >
            Tareas Completadas
          </h3>
          <p
            className="mt-4 text-4xl font-bold text-green-400"
            style={neonGreenStyle}
          >
            {stats.completed}
          </p>
          <p className="mt-2 text-xs text-green-500" style={neonGreenStyle}>
            Hechas (por ahora)
          </p>
        </div>

        {/* Card Pendientes */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
          <h3
            className="text-sm text-gray-400 uppercase tracking-wider"
            style={yellowNeonStyle}
          >
            Deudas Pendientes
          </h3>
          <p
            className="mt-4 text-4xl font-bold text-yellow-400"
            style={yellowNeonStyle}
          >
            {stats.pending}
          </p>
          <p className="mt-2 text-xs text-yellow-500" style={yellowNeonStyle}>
            Aún te reclaman
          </p>
        </div>
      </section>

      <section className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2
            className="text-xl font-semibold text-white"
            style={neonOrangeStyle}
          >
            Administra tus tareas
          </h2>
          <p className="text-gray-400 mt-1" style={neonOrangeStyle}>
            Visualiza, crea o marca las tareas que tienes.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Link
            to="/tasks"
            className="hidden md:inline-block border border-orange-500 text-orange-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-orange-900/40 hover:text-orange-300 hover:border-orange-400 transition-all duration-300"
            style={neonOrangeStyle}
          >
            Ir a Tareas
          </Link>
          <Link
            to="/tasks"
            className=" hidden md:inline-block border border-orange-500 text-orange-400 px-5 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-orange-900/40 hover:text-orange-300 hover:border-orange-400 transition-all duration-300"
            style={neonOrangeStyle}
          >
            Ver Tareas
          </Link>
        </div>
      </section>
    </div>
  );
};
