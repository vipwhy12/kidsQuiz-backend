import Material from "../models/Materials.js";
import Puzzle from "../models/Puzzles.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/Users.js";

dotenv.config();

export const getClassMaterial = async (req, res) => {
  const bearer = req.headers["authorization"].split(" ");
  const decodeToken = jwt.decode(bearer[1]);
  const findClassMaterial = await Materials.find({ email : decodeToken.id });

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
export const createPuzzle = async (req, res) => {
  // TODO : 이미지 업로드가 완료되었으면, 관련 파일들 넣어주자!
  const body = req.body;

  const title = body.title;
  const rows = Number(body.rows);
  const columns = Number(body.column);
  const image = "test";


  if (title && rows && columns){
    const bearer = req.headers["authorization"].split(" ");
    const decodeToken = jwt.decode(bearer[1]);
    
    const userId = await User.findOne({email : decodeToken.id}); 
    console.log(userId._id);
    console.log(userId._id.toString());
    console.log(userId);
    try {
      console.log("Puzzle 생성을 시작합니다. =========");
      await Puzzle.create({
        title : title, 
        image : image,
        rows : rows,
        columns :columns,
        user : userId._id.toString()
      })
    } catch (error){
      return res
        .status(500)
        .json({ message: "we faced a problem as creating Puzzle" });
    }
  }
}
