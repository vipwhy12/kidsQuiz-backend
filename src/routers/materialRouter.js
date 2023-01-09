import express from "express";
import {s3ImageUploadHandler, checkToken } from "../middleware.js";
import {getClassMaterial, s3Test, createPuzzle} from "../controllers/materialController.js"


const materialRouter = express.Router();

materialRouter.get("/", checkToken ,getClassMaterial);
// materialRouter.post("/", s3imageUploadHandler, s3Test);
materialRouter.post("/puzzle", s3ImageUploadHandler, createPuzzle);

export default materialRouter;