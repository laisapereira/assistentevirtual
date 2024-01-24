import express, { Express, Request, Response, NextFunction } from "express";

export const setupExpress = (app: Express) => {
    app.use(express.json());

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
};
