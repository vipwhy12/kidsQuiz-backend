import express from "express";
import {findId, findPw} from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post("/id", findId);
userRouter.post("/pw", findPw);

export default userRouter;