import express from "express";
import {getClassList, getClassHost, getClass, postNewClass, postClass, deleteClass, postImage } from "../controllers/classController.js";
import {verifyToken, avatarUploadHandler} from "../middlewares.js";

const classRouter = express.Router();

classRouter.route("/").all(verifyToken).get(getClassList);
classRouter.route("/host").all(verifyToken).get(getClassHost);
classRouter.route("/new").all(verifyToken).post(avatarUploadHandler, postNewClass);
classRouter.route("/image").post(avatarUploadHandler);
classRouter.route("/:id([0-9a-z]{24})")
    .all(verifyToken)
    .get(getClass)
    .post(avatarUploadHandler,postClass)
    .delete(deleteClass)




export default classRouter;



