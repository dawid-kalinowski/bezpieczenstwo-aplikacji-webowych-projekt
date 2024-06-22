import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Protected.css";

const Protected = () => {
    const isRun = useRef(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        axios
            .get("/documents")
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    return data ? (
        <div className="protected-container">
            {data.map((rec, i) => (
                <h3 key={i} className="rainbow-text">{rec}</h3>
            ))}
        </div>
    ) : (
        <div className="protected-container">
            <div className="rainbow-text">Loading...</div>
        </div>
    );
};

export default Protected;
