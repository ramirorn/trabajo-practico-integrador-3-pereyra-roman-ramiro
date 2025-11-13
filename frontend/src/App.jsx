import { useEffect, useState } from "react";
import { AppRouter } from "./router/AppRouter";
import { Loading } from "./components/Loading";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <NavBar authStatus={authStatus} onLogout={handleLogout} />
        <AppRouter
          authStatus={authStatus}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </main>
      <Footer />
    </div>
  );
};
