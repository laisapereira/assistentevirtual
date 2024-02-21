import cors from "cors";

import bodyParser from "body-parser";
import express, { Express } from "express";
import dotenv from "dotenv";
import { setupExpress } from "./expressConfig";
import { router } from "./router";
import cookieParser from "cookie-parser";
import { expressjwt } from "express-jwt";

dotenv.config();

const app: Express = express();
const port: number = 8000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

const jwtMiddleware = expressjwt({
  secret: "secret",
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.token,
});

app.use(jwtMiddleware);

setupExpress(app);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
