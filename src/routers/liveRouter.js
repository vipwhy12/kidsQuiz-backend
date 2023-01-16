import express from "express";

import { readliveImage, readlivePuzzle,readMultipleChoice}from "../controllers/liveController.js"
import { verifyToken } from "../middlewares.js";

const liveRouter = express.Router();


liveRouter.route("/image").post(verifyToken, readliveImage);
liveRouter.route("/puzzle").post(verifyToken, readlivePuzzle);
liveRouter.route("/multipleChoice").post(verifyToken, readMultipleChoice);



export default liveRouter;
