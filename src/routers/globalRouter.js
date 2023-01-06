import express from "express";
import { join } from "../controllers/userController.js";

const globalRouter = express.Router();

const handelHome = (req, res) => {
  res.send("home");
}

const handelJoin = (req, res) => {
  res.send("Join");
}

globalRouter.get("/", handelHome); 
globalRouter.get("/join", handelJoin);

export default globalRouter;