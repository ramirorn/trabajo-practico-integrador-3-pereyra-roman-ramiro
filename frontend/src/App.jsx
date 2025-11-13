import { useEffect, useState } from "react";
import { AppRouter } from "./router/AppRouter";
import { Loading } from "./components/Loading";

export const App = () => {
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          credentials: "include",
        });

        if (res.ok) {
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
        }
      } catch (err) {
        console.log(err);
        setAuthStatus("unauthenticated");
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setAuthStatus("authenticated");
  };

  const handleLogout = () => {
    setAuthStatus("unauthenticated");
  };

  if (authStatus === "checking") {
    return (
      <div>
        <Loading />;
      </div>
    );
  }
  return (
    // Va el navbar y el footer aca
    <AppRouter
      authStatus={authStatus}
      onLogin={handleLogin}
      onLogout={handleLogout}
    />
  );
};
