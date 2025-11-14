import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm.js";
import { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { values, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
    dni: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (
      !values.username.trim() ||
      !values.email.trim() ||
      !values.password.trim() ||
      !values.name.trim() ||
      !values.lastname.trim() ||
      !values.dni.trim()
    ) {
      setError("Todos los campos son requeridos");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        handleReset();
        navigate("/login");
      } else {
        setError(data.message || "Error al registrar usuario");
      }
    } catch (err) {
      console.log(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const neonTitleStyle = {
    color: "#4ade80",
    textShadow: `
      0 0 7px #16a34a,
      0 0 20px #4ade80,
      0 0 40px #22c55e
    `,
  };

  const neonButtonStyle = {
    boxShadow: "0 0 8px #fb923c, 0 0 20px #fb923c",
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 border border-gray-800 backdrop-blur-sm rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
          <h2
            className="text-3xl font-extrabold text-center mb-6"
            style={neonTitleStyle}
          >
            Crear Cuenta
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-950/30 border border-red-800 p-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="username"
              placeholder="Nombre de Usuario"
              value={values.username}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={values.email}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={values.password}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="name"
              placeholder="Nombre"
              value={values.name}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="lastname"
              placeholder="Apellido"
              value={values.lastname}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="dni"
              placeholder="DNI"
              value={values.dni}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={neonButtonStyle}
            className="w-full mt-6 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold py-3 rounded-lg hover:brightness-110 transition disabled:opacity-60"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleReset}
            className="inline-block bg-gray-800 text-gray-200 px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition"
          >
            Reiniciar Formulario
          </button>

          <p className="mt-4 text-sm text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link className="text-rose-400 hover:underline" to="/login">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
