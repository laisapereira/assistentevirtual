import express, { Express } from "express";
import dotenv from "dotenv";
import { setupExpress } from "./expressConfig.js";
import { router } from "./router.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();

app.get("/", (_req, res) => res.send("Hello World!"));

const PORT = 8000;
app.use(cookieParser());

setupExpress(app);
app.use(router);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`, `Base URL: ${PORT}`)
);
