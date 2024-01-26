import express from "express";
import createUser from "../UserController/createUser";
import deleteUser from "../UserController/deleteUser";
import listAllUsers from "../UserController/listAllUsers";
import updateUser from "../UserController/updateUser";

export const router = express.Router();
const app = express();

app.use(express.json());

router.get("/users", listAllUsers);

router.post("/create", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);




