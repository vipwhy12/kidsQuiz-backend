import Material from "../models/Materials.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getClassMaterial = async (req, res) => {
  const bearer = req.headers["authorization"].split(" ");
  const decodeToken = jwt.decode(bearer[1]);
  const findClassMaterial = await Materials.find({ name: decodeToken.id });

  console.log(findClassMaterial);

  return res.status(200).send(findClassMaterial);
};

export const s3Test = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const {
    body: { name },
    file,
  } = req;
  console.log(file);
  console.log("🎃 된다요!!!");
};


//👉 Materials Puzzle과 관련된 함수
export const createPuzzle = (req, res) => {
  // TODO : 퍼즐 만들기 
  console.log(req.body);
}