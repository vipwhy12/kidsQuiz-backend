
import express from "express";

import { verifyToken, s3ImagesUploadHandler, avatarUploadHandler } from "../middlewares.js";
import { getMaterial, createPuzzle, createMultipleChoice, createImage } from "../controllers/materialController.js"



const materialRouter = express.Router();
// materialRouter.post("/multipleChoice", verifyToken, createMultipleChoice);

//🌟미들웨어 합치고 수정본!
materialRouter.get("/", verifyToken, getMaterial);
materialRouter.route("/puzzle").all(verifyToken).post(avatarUploadHandler, createPuzzle);
materialRouter.route("/multipleChoice").all(verifyToken).post(s3ImagesUploadHandler, createMultipleChoice);


//Material 이미지 다중파일 버전
materialRouter.route("/image").all(verifyToken).post(s3ImagesUploadHandler, createImage);

//Material 이미지 싱글파일 버전
// materialRouter.route("/image").all(verifyToken).post(avatarUploadHandler, createImage);



export default materialRouter;
