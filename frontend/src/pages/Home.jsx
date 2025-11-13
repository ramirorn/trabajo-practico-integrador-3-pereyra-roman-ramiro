import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../components/Loading";

export const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  // const [tasksList, setTasksList] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProfileAndTasks = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        // Intentar obtener perfil (opcional)
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

        // Obtener tareas del usuario
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

        // Aceptar tanto un array directo como { tasks: [...] }
        const resolvedTasks = Array.isArray(tasksBody)
          ? tasksBody
          : tasksBody?.tasks || [];

        // setTasksList(resolvedTasks);
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          ¡Hola, {displayName}!
        </h1>
        <p className="text-gray-600">Resumen rápido de tus tareas</p>
      </header>

      {errorMessage && (
        <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">
          {errorMessage}
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-sm text-gray-500">Total de tareas</h3>
          <p className="mt-4 text-3xl font-bold text-gray-800">{stats.total}</p>
          <p className="mt-2 text-xs text-gray-400">Todas tus tareas</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-sm text-gray-500">Tareas completadas</h3>
          <p className="mt-4 text-3xl font-bold text-green-600">
            {stats.completed}
          </p>
          <p className="mt-2 text-xs text-gray-400">Tareas ya finalizadas</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-sm text-gray-500">Tareas pendientes</h3>
          <p className="mt-4 text-3xl font-bold text-yellow-600">
            {stats.pending}
          </p>
          <p className="mt-2 text-xs text-gray-400">Pendientes por completar</p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg shadow flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Gestiona tus tareas
          </h2>
          <p className="text-gray-600 mt-1">
            Ve todas tus tareas, crea nuevas o marca las completadas.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Link
            to="/tasks"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Ir a Tasks
          </Link>
          <Link
            to="/tasks"
            className="hidden md:inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition"
          >
            Ver tareas
          </Link>
        </div>
      </section>
    </div>
  );
};