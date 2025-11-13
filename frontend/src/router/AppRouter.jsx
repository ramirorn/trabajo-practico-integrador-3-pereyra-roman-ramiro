import { Navigate, Route, Routes } from "react-router";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

// Paginas
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
// Enrutador principal
export const AppRouter = ({ authStatus, onLogin, onLogout }) => {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route element={<PublicRoutes authStatus={authStatus} />}>
        <Route path="/login" element={<Login onLoginSucces={onLogin} />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* Rutas privadas */}
      <Route element={<PrivateRoutes authStatus={authStatus} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile onLogout={onLogout} />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={authStatus === "authenticated" ? "/home" : "/login"} />
        }
      />
    </Routes>
  );
};
