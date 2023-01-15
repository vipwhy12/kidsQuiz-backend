import express from "express";

<<<<<<< HEAD
// import { verifyToken } from "../middlewares";
import { getClassMaterial } from "../controllers/materialController.js";
import materialRouter from "./materialRouter.js";

const classMaterialRouter = express.Router();

// classMaterialRouter.get("/", verifyToken, getClassMaterial);
// materialRouter.get("/", checkToken, getMaterial);
// materialRouter.route("/puzzle").all(checkToken).post(s3ImageUploadHandler, createPuzzle);
// // materialRouter.route("/puzzle").all(checkToken).delete(deletePuzzle);
=======
import { checkToken } from "../middleware.js";
import { getClassMaterial, createClassMaterial } from "../controllers/materialController.js";

const classMaterialRouter = express.Router();

classMaterialRouter.get("/", checkToken, getClassMaterial);
classMaterialRouter.post("/", checkToken, createClassMaterial);


// // materialRouter.get("/", checkToken, getMaterial);
// // materialRouter.route("/puzzle").all(checkToken).post(s3ImageUploadHandler, createPuzzle);
// // // materialRouter.route("/puzzle").all(checkToken).delete(deletePuzzle);
>>>>>>> origin/yuna

export default classMaterialRouter;