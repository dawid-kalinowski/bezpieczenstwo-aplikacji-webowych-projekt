  import React, { useEffect } from "react";
  import Protected from "./components/Protected";
  import Public from "./components/Public";
  import AdminPanel from "./components/AdminPanel";

  import useAuth from "./hooks/useAuth";

  const App = () => {
    const { isLogin, userRoles } = useAuth();

    const isAdmin = userRoles.includes("admin");

    useEffect(() => {
        console.log("Role użytkownika:", userRoles);
    }, [userRoles]);

    return (
        <div>
            {isLogin ? (
                isAdmin ? (
                    <AdminPanel />
                ) : (
                    <Protected />
                )
            ) : (
                <Public />
            )}
        </div>
    );
  };

  export default App;
