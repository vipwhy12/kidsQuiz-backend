import Puzzle from "../models/Puzzles.js";
import Material from "../models/Materials.js";
import User from "../models/Users.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// import { getUserId } from  "../middleware.js";
dotenv.config();


//🌟 Material 관련 함수 

export const getMaterial = async (req, res) => {
  // TODO : 사용자의 아이디와 같은 수업 자료들 목록 불러오기
  const user = await User.findOne({email : req.UserEmail});  
  const findPuzzle = await Puzzle.find({user : user._id.toString()});
  return res.status(200).json({Puzzle : findPuzzle});
};


//👉 Materials Puzzle과 관련된 함수
export const createPuzzle = async (req, res) => {
  // TODO : 이미지 업로드가 완료되었으면, 관련 파일들 넣어주자!
  const userId = await User.findOne({email : req.UserEmail});
  const body = req.body;
  const title = body.title;
  const rows = Number(body.rows);
  const columns = Number(body.column);
  const image = "test";

  // console.log("빨리하고 집에 갈꺼야!");
  // console.log(req.file);
  // console.log("=====createPuzzle====")
  // console.log(userId.id);

  //🔥오류 발생 확인 하고 다시 시도 해보자🔥
  // const test = getUserId(req.UserEmail);
  // console.log(test);
  // Promise { <pending> }

  if (title && rows && columns){
    try {
      console.log("🧩 Puzzle 생성을 시작합니다.");
      await Puzzle.create({
        title : title, 
        image : req.file.location,
        rows : rows,
        columns :columns,
        user : userId.id.toString()
      })
      
      console.log("🧩 Puzzle 생성을 완료하였습니다.");
      return res.status(200).json({ message : "🧩 Puzzle 생성을 완료하였습니다."})
    } catch (error){
      return res
        .status(500)
        .json({ message: "🧩 Puzzle 생성에 실패하였습니다. 필수 데이터 확인 후 백엔드 개발자에게 문의해주세요" });
    }
  }
}

// export const deletePuzzle = async (req, res) => {

// }

