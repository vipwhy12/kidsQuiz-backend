
import express from "express";

import { verifyToken, s3ImagesUploadHandler, avatarUploadHandler, multipleChoiceHandler } from "../middlewares.js";
import { getMaterial, createPuzzle, createMultipleChoice} from "../controllers/materialController.js"



const materialRouter = express.Router();
// materialRouter.post("/multipleChoice", verifyToken, createMultipleChoice);

//🌟미들웨어 합치고 수정본!
materialRouter.get("/", verifyToken, getMaterial);
materialRouter.route("/puzzle").all(verifyToken).post(avatarUploadHandler, createPuzzle);
materialRouter.route("/multipleChoice").all(verifyToken).post(s3ImagesUploadHandler, createMultipleChoice);
// materialRouter.route("/image").all(verifyToken).post(s3ImagesUploadHandler, createMultipleChoice);




export default materialRouter;
