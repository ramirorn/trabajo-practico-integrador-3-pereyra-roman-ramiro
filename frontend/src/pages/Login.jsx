import { Link } from "react-router";
import { useForm } from "../hooks/useForm.js";
import { useState } from "react";
import { Loading } from "../components/Loading.jsx";

export const Login = ({ onLoginSucces }) => {
  // Manejo del formulario con el hook useForm
  const { values, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  // Estado para manejar la carga
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!values.username.trim() || !values.password.trim()) {
      setError("Username y password son requeridos");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        onLoginSucces();
      } else {
        setError("Credenciales invalidas");
        alert(data.message);
        handleReset();
      }
    } catch (err) {
      console.log(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-sm">
          <form
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Iniciar Sesión
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <input
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="text-center mt-4 w-full max-w-sm">
            <button
              className="text-white bg-blue-500 text-black py-2 px-3 font-bold rounded-lg hover:bg-blue-600 text-sm transition-all"
              onClick={handleReset}
            >
              Reiniciar Formulario
            </button>
            <button className="p-3">
              No tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-blue-500 py-5 hover:underline"
              >
                Regístrate aquí
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
