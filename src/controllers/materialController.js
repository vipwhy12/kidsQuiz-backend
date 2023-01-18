import User from "../models/Users.js";
import Image from "../models/Images.js";
import Puzzle from "../models/Puzzles.js";
import Material from "../models/Materials.js";
import MultipleChoice from "../models/MultipleChoice.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


//🌟 Material 관련 함수 
export const getMaterial = async (req, res) => {
  // TODO : 사용자의 아이디와 자료 보여주기
  const userObjectId = await User.findOne({email : req.loggedInUser});
  try{
    const findPuzzle = await Puzzle.find({ user : userObjectId });
    const findMultipleChoice = await MultipleChoice.find({ user : userObjectId });
    const findImage = await Image.find({ user : userObjectId })

    
    return res.status(200).json({ puzzle : findPuzzle, multipleChoice : findMultipleChoice, image : findImage });
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
  } else {
    return res.status(403).json({ message : "🧩 title이 없습니다."})
  }
}


//👉 Materials MultipleChoice 관련된 함수
export const createMultipleChoice = async (req, res) => {
  const {question, category, answer} = req.body;
  const userObjectId = await User.findOne({email : req.loggedInUser});

  let firstChoice
  let secondChoice

  //객관식 문제가 한글일때!
  if (category == 1){
    firstChoice = req.body.firstChoice;
    secondChoice = req.body.secondChoice;    
  }else if (category == 2) {
    // TODO : 다중파일 처리하자 POSTMAN 해결해볼것! 
    //! 유진 테스트 시작
    console.log("🚀req.files 찍어봄 ", req.files)
    console.log("🚀🚀req.files[0] 찍어봄 ", req.files[0])
    console.log("🚀🚀req.files[1] 찍어봄 ", req.files[1])
    firstChoice = req.files[0].location;
    secondChoice = req.files[1].location;
    //! 유진 테스트 종료

  } else {
    return res.status(500).json({ message: "🐋 MultipleChoice Category 선택 실패"});
  }

  try {
    console.log("🐋 MultipleChoice 생성을 시작합니다.");
    await MultipleChoice.create({
      question : question, 
      category : category,
      firstChoice : firstChoice,
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


// 👉 Materials Image관련 함수 (다중파일버전)
export const createImage = async (req, res) => {
  const userObjectId = await User.findOne({email : req.loggedInUser});
  let imageList = []

  for(let num = 0; num < req.files.length; num++){
    imageList[num] = req.files[num].location
  }

  imageList.forEach((element) => {
    // console.log("💊💊💊💊💊💊💊💊💊" + element)

    try {
      console.log("🩻 Image 생성을 시작합니다.");
      Image.create({
        image : element, 
        user : userObjectId
      })
      console.log("🩻 Image 생성을 완료했습니다.");
    } catch(error) {
        return res.status(500).json({ message: "Image 생성에 실패하였습니다.✨필수 데이터 확인 후 백엔드 개발자에게 문의해주세요 : " + error});
    }
  })

  return res.status(200).json({ message : "🩻 Image 생성을 완료했습니다."});
}


// export const createImage = async (req, res) => {
//   const userObjectId = await User.findOne({email : req.loggedInUser});

//   try {
//     console.log("🩻 Image 생성을 시작합니다.");
//     await Image.create({
//       image : req.file.location,
//       user : userObjectId
//     })
//     console.log("🩻 Image 생성을 완료했습니다");
//     return res.status(200).json({ message : "🩻 Image 생성을 완료했습니다"})
//   } catch (error){
//     return res
//       .status(500)
//       .json({ message: "🩻 Image 생성에 실패하였습니다. 필수 데이터 확인 후 백엔드 개발자에게 문의해주세요" + error });
//   } 
// }


//=============================================
//🌟 ClassMaterial 관련 함수 

export const getClassMaterial = async (req, res) => {
  // 사용자가 가지고 있는 classMaterial 목록 불러오기 
  try {
    const userObjectId = await User.findOne({email : req.loggedInUser})
    const MaterialList = await Material.find({user : userObjectId});
    return res.status(200).json({ classMaterial : MaterialList });
  }catch (err){
    return res.status(404).json({ err });
  }
}

export const createClassMaterial = async (req, res) => {
  
  const { title, puzzle, multipleChoice, image } = req.body
  const userObjectId = await User.findOne({email : req.loggedInUser})
  console.log(req.body)
  // console.log(re)
  console.log( "여기여여겨겨겨겨겨 타임이야" + today)
  console.log(title, puzzle, multipleChoice, image)

  let puzzleList = []
  let multipleChoiceList = []
  let imageList = []
  let today = new Date(); 


  
  if(puzzle){
    for(let i=0; i < puzzle.length; i++){
      puzzleList[i] = puzzle[i].objectId
    }
  }

  if(multipleChoice){
    for(let i=0; i < multipleChoice.length; i++){
      multipleChoiceList[i] = multipleChoice[i].objectId
    }
  }  

  if(image){
    for(let i=0; i < image.length; i++){
      imageList[i] = image[i].objectId
    }
  }
  
  try {
    console.log("✨Class Materials 생성을 시작합니다.");
    await Material.create({
      title : title, 
      createdAt : today,
      user : userObjectId,
      puzzle : puzzleList,
      image : imageList,
      multipleChoice : multipleChoiceList
    })
    console.log("✨Class Materials 생성을 완료하였습니다.✨");
    return res.status(200).json({ message : "✨Class Materials 생성을 완료하였습니다.✨"})
  } catch (error){
    return res.status(500).json({ message: "✨Class Materials 생성에 실패하였습니다.✨필수 데이터 확인 후 백엔드 개발자에게 문의해주세요 : " + error});
  }
}