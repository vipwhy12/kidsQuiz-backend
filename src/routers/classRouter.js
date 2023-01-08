import express from "express";
import {getClassList, getClass, postNewClass, postClass, deleteClass } from "../controllers/classController.js";
import {verifyToken} from "../middlewares.js";

const classRouter = express.Router();

classRouter.route("/").all(verifyToken).get(getClassList);
classRouter.route("/new").all(verifyToken).post(postNewClass);
classRouter.route("/:id([0-9a-z]{24})")
    .all(verifyToken)
    .get(getClass)
    .post(postClass)
    .delete(deleteClass)

export default classRouter;



