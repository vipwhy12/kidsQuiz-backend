import express from "express";
import {getClassList, getClass, postNewClass, postClass, deleteClass } from "../controllers/classController.js";

const classRouter = express.Router();

classRouter.get("/list/:id([0-9a-z]{24})", getClassList);
classRouter.post("/new", postNewClass);

classRouter.route("/:id([0-9a-z]{24})")
    .get(getClass)
    .post(postClass)
    .delete(deleteClass)

export default classRouter;



