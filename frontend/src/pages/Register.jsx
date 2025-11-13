import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm.js";

export const Register = () => {
  const navigate = useNavigate();

  const { values, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Usuario registrado:", values);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-sm">
          <form
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm"
            onSubmit={(event) => handleSubmit(event)}
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Crear Cuenta
            </h2>
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
              name="firstname"
              placeholder="FirstName"
              value={values.firstname}
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
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
              onClick={() => {
                navigate("/login");
              }}
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
