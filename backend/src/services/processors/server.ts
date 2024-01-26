import express, { Express } from "express";
import dotenv from "dotenv";
import { setupExpress } from "./expressConfig";
import { router } from "./router";

dotenv.config();

const app: Express = express();
const port: number = 8000;

setupExpress(app);
app.use(router);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
