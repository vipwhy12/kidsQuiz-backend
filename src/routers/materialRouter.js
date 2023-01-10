
import express from "express";
import {s3ImageUploadHandler, checkToken} from "../middleware.js";
import {getMaterial, createPuzzle} from "../controllers/materialController.js"


const materialRouter = express.Router();

materialRouter.get("/", checkToken, getMaterial);
materialRouter.route("/puzzle").all(checkToken).post(s3ImageUploadHandler, createPuzzle);
// materialRouter.route("/puzzle").all(checkToken).delete(deletePuzzle);

export default materialRouter;
