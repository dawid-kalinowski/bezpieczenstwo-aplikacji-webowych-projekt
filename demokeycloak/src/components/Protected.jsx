import React, {useEffect, useRef} from "react";
import axios from "axios";

const Protected = () => {
    const isRun = useRef(false);

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        axios
        .get("/documents")
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }, []);
  return <div>Protected</div>;
};

export default Protected;