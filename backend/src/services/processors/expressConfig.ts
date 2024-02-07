import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import RequestHandler, { expressjwt } from "express-jwt";

dotenv.config();

/* const secret = process.env.SECRET_KEY || 'secret' as string;  */

export const setupExpress = (app: Express) => {
  app.use(express.json());

  app.use(
    expressjwt({
      secret: "secret",
      algorithms: ["HS256"],
    }).unless({
      path: ["/login", "/register"],
    })
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
};
