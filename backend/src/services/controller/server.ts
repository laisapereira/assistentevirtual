import express, { Express } from "express";
import dotenv from "dotenv";
import { setupExpress } from "../processors/expressConfig";
import { router } from "./routes/routes";

import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
setupExpress(app);
const port: number = 3333;
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
