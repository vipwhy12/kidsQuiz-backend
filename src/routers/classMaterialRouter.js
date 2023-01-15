import express from "express";
import { verify } from "jsonwebtoken";

import {createClassMaterial, getClassMaterial} from "../controllers/materialController.js"
import { verifyToken } from "../middlewares.js";
import materialRouter from "./materialRouter.js";

const classMaterialRouter = express.Router();

// classMaterialRouter.get("/", verifyToken, getClassMaterial);
classMaterialRouter.route("/").all(verifyToken).post(createClassMaterial);


export default classMaterialRouter;