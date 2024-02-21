import express, { Express } from "express";
import dotenv from "dotenv";
import { setupExpress } from "./expressConfig";
import { router } from "./router";
import cookieParser from "cookie-parser";
import { expressjwt } from "express-jwt";

dotenv.config();

const app: Express = express();
const port: number = 8000;
app.use(cookieParser());

const jwtMiddleware = expressjwt({
  secret: "secret",
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.token,
});

app.use(jwtMiddleware);

setupExpress(app);
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
