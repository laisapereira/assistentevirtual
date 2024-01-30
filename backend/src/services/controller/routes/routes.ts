import express from "express";
import createUser from "../UserController/createUser";
import deleteUser from "../UserController/deleteUser";
import listAllUsers from "../UserController/listAllUsers";
import updateUser from "../UserController/updateUser";
import AuthController from "../UserController/AuthController";

import { AuthMiddleware } from "../../middlewares/auth";

export const router = express.Router();

router.use(express.json());

router.get("/users", AuthMiddleware, listAllUsers);

router.post("/create", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.post("/auth", AuthController);




