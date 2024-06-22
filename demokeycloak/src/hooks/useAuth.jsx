import React, { useState } from "react";

const useAuth = () => {
    const [isLogin, setLogin] = useState(false);
    return isLogin;
}
export default useAuth;