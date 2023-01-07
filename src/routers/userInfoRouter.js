import express from "express";
import {postCredential, getUserInfo, postUserInfo, deleteUser} from "../controllers/userinfoController.js";

const userInfoRouter = express.Router();

userInfoRouter.post("/credential", postCredential )
userInfoRouter.route("/:id([0-9a-z]{24})")
    .get(getUserInfo)
    .post(postUserInfo)
    .delete(deleteUser)

export default userInfoRouter;



