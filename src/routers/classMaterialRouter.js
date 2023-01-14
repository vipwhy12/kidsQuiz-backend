import express from "express";

import { checkToken } from "../middleware.js";
import { getClassMaterial } from "../controllers/materialController.js";
import materialRouter from "./materialRouter.js";

const classMaterialRouter = express.Router();

classMaterialRouter.get("/", checkToken, getClassMaterial);
// materialRouter.get("/", checkToken, getMaterial);
// materialRouter.route("/puzzle").all(checkToken).post(s3ImageUploadHandler, createPuzzle);
// // materialRouter.route("/puzzle").all(checkToken).delete(deletePuzzle);

export default classMaterialRouter;