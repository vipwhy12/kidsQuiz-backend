import express from "express";
import {s3ImageUploadHandler, checkToken, s3MultipleImageUploadHandler} from "../middleware.js";
import {getMaterial, createPuzzle, createMultipleChoice} from "../controllers/materialController.js"


const materialRouter = express.Router();

materialRouter.get("/", checkToken, getMaterial);
materialRouter.route("/puzzle").all(checkToken).post(s3ImageUploadHandler, createPuzzle);
materialRouter.route("/MultipleChoice").all(checkToken).post(s3MultipleImageUploadHandler, createMultipleChoice);


export default materialRouter;