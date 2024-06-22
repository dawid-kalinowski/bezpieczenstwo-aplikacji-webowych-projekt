import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const useAuth = () => {
    const isRun = useRef(false);
    const [isLogin, setLogin] = useState(false);
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        client
            .init({
                onLoad: "login-required",
            })
            .then((authenticated) => {
                if (authenticated) {
                    const token = client.token;
                    if (token) {
                        const decodedToken = client.tokenParsed;
                        const roles = decodedToken.realm_access.roles || [];
                        setUserRoles(roles);
                        setLogin(true);
                    }
                } else {
                    setLogin(false);
                }
            })
            .catch((error) => {
                console.error("Błąd inicjalizacji Keycloak:", error);
                setLogin(false);
            });
    }, []);

    return { isLogin, userRoles, client };
};

export default useAuth;
