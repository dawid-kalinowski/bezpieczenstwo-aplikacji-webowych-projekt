import React, { useState, useEffect } from "react";
import { Keycloak } from "keycloak-js";

const useAuth = () => {
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        const client = new Keycloak( {
            url: import.meta.env.VITE_KEYCLOAK_URL,
            realm: import.meta.env.VITE_KEYCLOAK_REALM,
            clientID: import.meta.env.VITE_KEYCLOAK_CLIENT,
        });
        client.init({ onLoad: "login-required"}).then((res) => setLogin(res));
    }, []);

    return isLogin;
}
export default useAuth;