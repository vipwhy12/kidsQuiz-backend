import express from "express";
import {postCredential, getUserInfo, postUserInfo, deleteUser} from "../controllers/userinfoController.js";
import {verifyToken} from "../middlewares.js";

const userInfoRouter = express.Router();

userInfoRouter.route("/credential").all(verifyToken).post(postCredential)
userInfoRouter.route("/:id([0-9a-z]{24})")
    .all(verifyToken)
    .get(getUserInfo)
    .post(postUserInfo)
    .delete(deleteUser)

export default userInfoRouter;



