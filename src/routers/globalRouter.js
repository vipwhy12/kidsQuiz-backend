import express from "express";
import { postLogin, postJoin } from "../controllers/userController.js";

const globalRouter = express.Router();

globalRouter.post("/login", postLogin);
globalRouter.post("/join", postJoin);

export default globalRouter;
