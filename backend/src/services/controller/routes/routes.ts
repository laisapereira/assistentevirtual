import {
  loginController,
  registerController,
} from "./../UserController/AuthController";
import express from "express";
import createUser from "../UserController/createUser";
import deleteUser from "../UserController/deleteUser";
import listAllUsers from "../UserController/listAllUsers";
import updateUser from "../UserController/updateUser";

import { AuthMiddleware } from "../../middlewares/auth";

export const router = express.Router();

router.get("/users", AuthMiddleware, listAllUsers);

router.put("/users/:id", AuthMiddleware, updateUser);

router.delete("/users/:id", AuthMiddleware, deleteUser);

router.post("/login", loginController);

router.post("/create", createUser);

router.post("/register", registerController);
