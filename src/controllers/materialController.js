import Puzzle from "../models/Puzzles.js";
import Material from "../models/Materials.js";
import User from "../models/Users.js";
import MultipleChoice from "../models/MultipleChoice.js";

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

//👉 Materials MultipleChoice 관련된 함수
export const createMultipleChoice = async (req, res) => {

  console.log("안농 나는 도비야 도비는 자유야!🐥"); 
  console.log(req.files);
  const user = await User.findOne({email : req.UserEmail});
  const {question, fistChoiceText, SecondChoiceText} = req.body;
  const answer = Number(req.body.answer);


  // 필수 값 확인
  if(question == "" || answer == "" ){
    return res.status(408).json({ message: "🐋 MultipleChoice 생성에 실패하였습니다. 필수 파라미터를 확인해주세요"});

  } else if(req.files == "") {
    try {
      console.log("🐋 MultipleChoice 생성을 시작합니다.");
      await MultipleChoice.create({
        question : question, 
        fistChoiceText : fistChoiceText,
        SecondChoiceText : SecondChoiceText,
        answer : answer,
        fistChoiceImage : null,
        SecondChoiceImage : null,
        user :  user.id.toString()
      })
      console.log("🐋 MultipleChoice 생성을 완료하였습니다.🐋");
      return res.status(200).json({ message : "🐋 MultipleChoice 생성을 완료하였습니다.🐋"})
    } catch (error){
      return res.status(500).json({ message: "🐋 MultipleChoice 생성에 실패하였습니다. 필수 데이터 확인 후 백엔드 개발자에게 문의해주세요 : " + error});
    }
  } else {
    try {
      console.log("🐋 MultipleChoice 생성을 시작합니다.");
      await MultipleChoice.create({
        question : question, 
        fistChoiceText : null,
        SecondChoiceText : null,
        answer : answer,
        fistChoiceImage : req.files[0].location,
        SecondChoiceImage : req.files[1].location,
        user :  user.id.toString()
      })
      console.log("🐋 MultipleChoice 생성을 완료하였습니다.🐋");
      return res.status(200).json({ message : "🐋 MultipleChoice 생성을 완료하였습니다.🐋"})
    } catch (error){
      return res.status(500).json({ message: "🐋 MultipleChoice 생성에 실패하였습니다. 필수 데이터 확인 후 백엔드 개발자에게 문의해주세요 : " + error});
    }
  }
}



//=============================================
//🌟 ClassMaterial 관련 함수 

export const getClassMaterial = async (req, res) => {
  // 사용자가 가지고 있는 classMaterial 목록 불러오기 
  const user = await User.findOne({email : req.UserEmail});
  const MaterialList = await Material.find({user : user._id});
  return res.status(200).json({ ClassMaterial : MaterialList });
}


export const createClassMaterial = async (req, res) => {
  // 사용자가 가지고 있는 classMaterial 목록 불러오기 

  const user = await User.findOne({email : req.UserEmail});
  const { title, createAt, puzzle, multipleChoice} = req.body;
  // console.log("이것은 ClassMaterial을 만드는 목록입니다.");
  // console.log(req.UserEmail);
  // console.log(user._id); 
  // console.log(title, createAt, puzzle, multipleChoice);
  
  let puzzle_arr = [];
  let multipleChoice_arr = [];

  for (let i=0; i < puzzle.length; i++){
    puzzle_arr[i] = puzzle[i].ObjectId;
    console.log(i);
  }

  for (let i=0; i < multipleChoice.length; i++){
    multipleChoice_arr[i] = multipleChoice[i].ObjectId;
    console.log(i);
  }
  // console.log(puzzle[0].ObjectId);
  console.log(arr);
  try {
    console.log("✨Class Materials 생성을 시작합니다.");
    await Material.create({
      title : title, 
      createAt : createAt,
      user : user.id.toString(),
      puzzle : puzzle_arr,
      multipleChoice : multipleChoice_arr
    })
    console.log("✨Class Materials 생성을 완료하였습니다.✨");
    return res.status(200).json({ message : "✨Class Materials 생성을 완료하였습니다.✨"})
  } catch (error){
    return res.status(500).json({ message: "✨Class Materials 생성에 실패하였습니다.✨필수 데이터 확인 후 백엔드 개발자에게 문의해주세요 : " + error});
  }
}


