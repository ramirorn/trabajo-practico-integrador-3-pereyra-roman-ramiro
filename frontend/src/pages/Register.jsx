import { useNavigate } from "react-router";
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
      console.log(err)
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
              Crear Cuenta
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
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="email"
              placeholder="Email"
              value={values.email}
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
            <input
              className="w-full px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="lastname"
              placeholder="LastName"
              value={values.lastname}
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="dni"
              placeholder="DNI"
              value={values.dni}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
            >
              Registrar
            </button>
          </form>
          <div className="text-center mt-4 w-full max-w-sm">
            <button
              className="text-white bg-blue-500 text-black py-2 px-3 font-bold rounded-lg hover:bg-blue-600 text-sm transition-all"
              onClick={handleReset}
            >
              Reiniciar Formulario
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
