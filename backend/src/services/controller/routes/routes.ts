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
import listAllDepartments from "../UserController/listAllDepartments";

import { router as chatRouter} from '../../processors/router'

export const router = express.Router();

// controles adm

router.put("/users/:id", AuthMiddleware, updateUser);

router.delete("/users/:id", AuthMiddleware, deleteUser);

router.post("/create", createUser);

// auth
router.post("/signIn", loginController);



router.post("/register", registerController);

router.get("/users", AuthMiddleware, listAllUsers);

router.get("/departments", listAllDepartments);

router.use("/", chatRouter)


