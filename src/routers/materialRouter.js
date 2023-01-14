
import express from "express";
import { verifyToken, s3ImagesUploadHandler, avatarUploadHandler, MultipleChoiceHandler } from "../middlewares.js";
import { getMaterial, createPuzzle, createMultipleChoice} from "../controllers/materialController.js"


const materialRouter = express.Router();

// materialRouter.get("/", verifyToken, getMaterial);
// materialRouter.post("/multipleChoice", verifyToken, createMultipleChoice);

//🌟미들웨어 합치고 수정본!
materialRouter.route("/puzzle").all(verifyToken).post(avatarUploadHandler, createPuzzle);
materialRouter.route("/multipleChoice").all(verifyToken).post(MultipleChoiceHandler, createMultipleChoice);


export default materialRouter;
