import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export const PublicRoutes = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const userIsLogged = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          credentials: "include",
        });
        setIsLogged(response.ok);
      } catch (err) {
        setIsLogged(false);
      }
      userIsLogged();
    };
  }, []);
  return !isLogged ? <Outlet /> : <Navigate to={"/home"} />;
};
