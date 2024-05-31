import express from "express";
import dotenv from "dotenv";
import { setupExpress } from "./expressConfig.js";
import { router } from "./router.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = 8000;
app.use(cookieParser());
setupExpress(app);
app.use(router);
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
