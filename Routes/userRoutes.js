import {
  register,
  login,
  deleteUserController,
  getAllUsersController,
} from "../Controllers/userController";

import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete/:id", deleteUserController);
router.get("/all", getAllUsersController);


export default router;