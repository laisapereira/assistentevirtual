
import express, { Express } from "express";
import dotenv from "dotenv";
import { setupExpress } from "../processors/expressConfig";
import { router } from "./routes/routes";
import cookieParser from 'cookie-parser'; // Import the correct type for cookieParser






dotenv.config();

const app: Express = express();
setupExpress(app);
const port: number = 3333;
app.use(router);

app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
