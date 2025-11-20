import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm.js";
import { Loading } from "../components/Loading";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  const { values, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const neonStyle = {
    color: "#fb923c",
    textShadow: `
      0 0 7px #c2410c,
      0 0 20px #fb923c,
      0 0 40px #f97316
    `,
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error fetching tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    handleReset();
    setShowForm(true);
    setMsg("");
  };

  const openEdit = (task) => {
    setEditingId(task.id);
    handleChange({ target: { name: "title", value: task.title } });
    handleChange({ target: { name: "description", value: task.description } });
    handleChange({
      target: { name: "is_completed", value: !!task.is_completed },
    });
    setShowForm(true);
    setMsg("");
  };

  const submit = async () => {
    if (!values.title?.trim() || !values.description?.trim()) {
      setMsg("Título y descripción son obligatorios");
      return;
    }

    const payload = {
      title: values.title,
      description: values.description,
      is_completed: !!values.is_completed,
    };

    const url = editingId
      ? `http://localhost:3000/api/tasks/${editingId}`
      : "http://localhost:3000/api/tasks";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setMsg(errData.msg || "Error en la operación");
        return;
      }
      setMsg(editingId ? "Tarea actualizada" : "Tarea creada");
      setShowForm(false);
      handleReset();
      fetchTasks();
    } catch (err) {
      console.log(err);
      setMsg("Error de red");
    }
  };

  const removeTask = async (id) => {
    if (!confirm("¿Eliminar tarea?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("No se pudo eliminar");
      setMsg("Tarea eliminada");
      fetchTasks();
    } catch (err) {
      console.error(err);
      setMsg("Error al eliminar");
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ is_completed: !task.is_completed }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar");
      fetchTasks();
    } catch (err) {
      console.log(err);
      setMsg("Error al actualizar estado");
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-200">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={neonStyle}>
          Mis Tareas
        </h1>
        <button
          onClick={openCreate}
          className="border border-orange-500 text-orange-400 px-4 py-2 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-orange-900/40 hover:text-orange-300 hover:border-orange-400 transition-all duration-300"
          style={neonStyle}
        >
          Nueva tarea
        </button>
      </header>

      {msg && (
        <div className="mb-4 text-sm text-green-300 bg-green-950 border border-green-800 p-2 rounded">
          {msg}
        </div>
      )}

      {tasks.length === 0 ? (
        <p className="text-gray-400">No hay tareas.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-800 hover:border-gray-700 transition-colors duration-300 flex justify-between items-start ${
                task.is_completed
                  ? "opacity-80 line-through text-gray-400"
                  : "text-gray-100"
              }`}
            >
              <div>
                <h3
                  className="font-semibold"
                  style={!task.is_completed ? neonStyle : undefined}
                >
                  {task.title}
                </h3>
                <p className="text-sm mt-1 text-gray-300">{task.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <label className="flex items-center text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={!!task.is_completed}
                    onChange={() => toggleComplete(task)}
                    className="mr-2"
                  />
                  {task.is_completed ? "Completada" : "Pendiente"}
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(task)}
                    className="text-sm border border-orange-500 text-orange-400 px-3 py-1 rounded-lg font-bold uppercase text-xs tracking-wider hover:bg-orange-900/40 hover:text-orange-300 hover:border-orange-400 transition-all duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-sm border border-red-600 text-red-400 px-3 py-1 rounded-lg font-bold uppercase text-xs tracking-wider hover:bg-red-900/30 transition-all duration-300"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-800 w-full max-w-md">
            <h2 className="text-lg font-bold mb-3">
              {editingId ? "Editar" : "Crear"} tarea
            </h2>

            <label className="block text-sm">Título</label>
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              className="w-full mb-2 px-2 py-1 bg-gray-800 text-white"
            />

            <label className="block text-sm">Descripción</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              className="w-full mb-2 px-2 py-1 bg-gray-800 text-white"
            />

            <label className="flex items-center gap-2 mb-3">
              <input
                name="is_completed"
                type="checkbox"
                checked={!!values.is_completed}
                onChange={(e) =>
                  handleChange({
                    target: { name: "is_completed", value: e.target.checked },
                  })
                }
              />
              Completada
            </label>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1 border border-gray-700 rounded text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={submit}
                className="px-3 py-1 bg-orange-500 rounded text-white font-bold"
              >
                {editingId ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
