import { Navigate, Route, Routes } from "react-router";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

// Paginas
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";

// Enrutador principal
export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* Rutas privadas */}
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
};
