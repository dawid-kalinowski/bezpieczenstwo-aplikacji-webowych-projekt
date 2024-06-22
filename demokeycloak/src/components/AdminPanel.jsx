import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        axios.get("/documents/admin")
            .then((res) => setAdminData(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>Admin Panel</h2>
            {adminData ? (
                <ul>
                    {adminData.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminPanel;
