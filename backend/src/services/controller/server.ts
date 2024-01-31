import express, { Express } from "express";
import dotenv from "dotenv";
import { setupExpress } from "../processors/expressConfig";
import { router } from "./routes/routes";


dotenv.config();

const app: Express = express();
setupExpress(app);
const port: number = 3333;
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
