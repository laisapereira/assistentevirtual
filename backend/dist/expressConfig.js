import dotenv from "dotenv";
import express from "express";
dotenv.config();
/* const secret = process.env.SECRET_KEY || 'secret' as string;  */
export const setupExpress = (app) => {
    app.use(express.json());
    app.use((_req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });
};
