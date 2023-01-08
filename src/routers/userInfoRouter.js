import express from "express";
import {postCredential, getUserInfo, postUserInfo, deleteUser} from "../controllers/userInfoController.js";
import {verifyToken} from "../middlewares.js";

const userInfoRouter = express.Router();

userInfoRouter.route("/")
    .all(verifyToken)
    .get(getUserInfo)
    .post(postUserInfo)
    .delete(deleteUser)
userInfoRouter.route("/credential").all(verifyToken).post(postCredential)

export default userInfoRouter;



