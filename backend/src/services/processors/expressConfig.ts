import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";

dotenv.config();

export const setupExpress = (app: Express) => {
  app.use(express.json());

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
};