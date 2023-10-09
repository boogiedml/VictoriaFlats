import express from "express";
import { login, register } from "../controllers/admin.js";

const adminRouter = express.Router();

// Create new User
adminRouter.route("/register").post(register);

// Authenticate User
adminRouter.route("/login").post(login);

export default adminRouter;
