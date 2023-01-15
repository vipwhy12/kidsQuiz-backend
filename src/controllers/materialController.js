import Puzzle from "../models/Puzzles.js";
import Material from "../models/Materials.js";
import User from "../models/Users.js";
import MultipleChoice from "../models/MultipleChoice.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {getUserId} from "../middlewares.js";

dotenv.config();


//🌟 Material 관련 함수 
export const getMaterial = async (req, res) => {
  // TODO : 사용자의 아이디와 자료 보여주기
  const userObjectId = await User.findOne({email : req.loggedInUser});

  try{
    const findPuzzle = await Puzzle.find({ user : userObjectId });
    const findMultipleChoice = await MultipleChoice.find({ user : userObjectId });
    return res.status(200).json({Puzzle : findPuzzle, MultipleChoice : findMultipleChoice});

  }catch(error){
    return res.status(419).json({message : "💥getMaterial Error:💥"  + error});
  }
};


//👉 Materials Puzzle과 관련된 함수
export const createPuzzle = async (req, res) => {
  const title = req.body.title;
  const userObjectId = await User.findOne({email : req.loggedInUser});

  if (title){
    try {
      console.log("🧩 Puzzle 생성을 시작합니다.");
      await Puzzle.create({
        title : title, 
        image : req.file.location,
        user : userObjectId
      })
      console.log("🧩 Puzzle 생성을 완료하였습니다.");
      return res.status(200).json({ message : "🧩 Puzzle 생성을 완료하였습니다."})
    } catch (error){
      return res
        .status(500)
        .json({ message: "🧩 Puzzle 생성에 실패하였습니다. 필수 데이터 확인 후 백엔드 개발자에게 문의해주세요" + error });
    }
  }
}


//👉 Materials MultipleChoice 관련된 함수
export const createMultipleChoice = async (req, res) => {
  const {question, category, answer} = req.body;
  const userObjectId = await User.findOne({email : req.loggedInUser});

  let fistChoice
  let secondChoice

  console.log(question, category, answer)

  //객관식 문제가 한글일때!
  if (category == 1){
    fistChoice = req.body.fistChoice;
    secondChoice = req.body.secondChoice;    
  }else if (category == 2) {
    // TODO : 다중파일 처리하자 POSTMAN 해결해볼것! 
    // fistChoice = req.files[0].location;
    // secondChoice = req.files[1].location;    
  } else {
    return res.status(500).json({ message: "🐋 MultipleChoice Category 선택 실패"});
  }

  try {
    console.log("🐋 MultipleChoice 생성을 시작합니다.");
    await MultipleChoice.create({
      question : question, 
      category : category,
      fistChoice : fistChoice,
      secondChoice : secondChoice, 
      answer : answer,
      user : userObjectId
    })
    console.log("🐋 MultipleChoice 생성을 완료하였습니다.🐋");
    return res.status(200).json({ message : "🐋 MultipleChoice 생성을 완료하였습니다.🐋"});
  } catch (error){
    return res.status(500).json({ message: "🐋 MultipleChoice 생성에 실패하였습니다. 필수 데이터 확인 후 백엔드 개발자에게 문의해주세요 : " + error});
  }
}


// 👉 Materials Image관련 함수
export const createImage = async (req, res) => {
  console.log(req.files);
  console.log(req.files[0].location)
  console.log(req.files[1].location)
}



//💔다중이미지 테스트입니다. 
// export const MultipleImageTest = async (req, res) => {
//   console.log(req.files);
//   console.log(req.files[0].location)
//   console.log(req.files[1].location)
// }





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


