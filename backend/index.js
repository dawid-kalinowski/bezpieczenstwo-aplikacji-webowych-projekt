import dotenv from "dotenv";
import express from 'express';

import documents from "./Routes/documents.js";


(async function() {
    dotenv.config();

    const {PORT} = process.env;
    const app = express();
    const server = app.listen(PORT, () =>
        console.log(`Serwer nasłuchuje na ${PORT}`)
);
    app.use("/documents", documents);
})();