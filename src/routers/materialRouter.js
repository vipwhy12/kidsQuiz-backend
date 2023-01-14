
import express from "express";
import { verifyToken, s3ImageUploadHandler, avatarUploadHandler } from "../middlewares.js ";
import {getMaterial, createPuzzle, createMultipleChoice} from "../controllers/materialController.js"


const materialRouter = express.Router();

// materialRouter.get("/", verifyToken, getMaterial);
// materialRouter.post("/multipleChoice", verifyToken, createMultipleChoice);
// materialRouter.route("/puzzle").all(verifyToken).post(s3ImageUploadHandler, createPuzzle);
// materialRouter.route("/puzzle").all(checkToken).delete(deletePuzzle);

//🌟미들웨어 합치고 수정본!
materialRouter.route("/puzzle").all(verifyToken).post(avatarUploadHandler, createPuzzle);
// materialRouter.route("/puzzle").post(s3ImageUploadHandler, createPuzzle);


export default materialRouter;
