import express from "express";

import { checkToken } from "../middleware.js";
import { getClassMaterial, createClassMaterial } from "../controllers/materialController.js";

const classMaterialRouter = express.Router();

classMaterialRouter.get("/", checkToken, getClassMaterial);
classMaterialRouter.post("/", checkToken, createClassMaterial);


// // materialRouter.get("/", checkToken, getMaterial);
// // materialRouter.route("/puzzle").all(checkToken).post(s3ImageUploadHandler, createPuzzle);
// // // materialRouter.route("/puzzle").all(checkToken).delete(deletePuzzle);

export default classMaterialRouter;