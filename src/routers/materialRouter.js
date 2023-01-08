import express from "express";
import {s3imageUploadHandler} from "../middleware.js";
import {getClassMaterials, s3Test} from "../controllers/materialController.js"


const materialRouter = express.Router();

materialRouter.get("/", getClassMaterials);

// materialRouter.post("/", avatarUpload, s3Test);
// materialRouter.post("/", s3imageUploadHandler);
materialRouter.post("/", s3imageUploadHandler, s3Test);
// (avatarUploadHandler, postEdit);


// materialRouter.route("/:id([0-9a-z]{24})")
//     .get(getClassMaterials)
    // .post(postClass)
    // .delete(deleteClass)


export default materialRouter;