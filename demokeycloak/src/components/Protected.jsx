import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

const Protected = () => {
    const isRun = useRef(false);

    const [data, setData] = useState(null)

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        axios
        .get("/documents")
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    }, []);
  return data ? <>{data.map((rec, i) => (<h3 key={i}>{rec}</h3>))}</> : <div> Protected</div>;
};

export default Protected;