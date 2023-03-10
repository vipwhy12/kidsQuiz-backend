import User from "../models/Users.js";
import Image from "../models/Images.js";
import Puzzle from "../models/Puzzles.js";
import Material from "../models/Materials.js";
import MultipleChoice from "../models/MultipleChoice.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


//π Material λͺ©λ‘ μ‘°ν
export const getMaterial = async (req, res) => {
  try{
    const userObjectId = await User.findOne({email : req.loggedInUser});
    const findPuzzle = await Puzzle.find({ user : userObjectId });
    const findMultipleChoice = await MultipleChoice.find({ user : userObjectId });
    const findImage = await Image.find({ user : userObjectId })
    return res.status(200).json({ puzzle : findPuzzle, multipleChoice : findMultipleChoice, image : findImage });
  }catch(error){
    return res.status(419).json({message : "π₯getMaterial Error:π₯"  + error});
  }
};


//π Materials Puzzle λ§λ€κΈ°
export const createPuzzle = async (req, res) => {
  const title = req.body.title;
  const userObjectId = await User.findOne({email : req.loggedInUser});
  
  if (!req.file) {
    return res.status(500).json({ message: "νμΌμ΄ μ¬λ°λ₯΄κ² μ μ₯λμ§ μμ"});
  }

  if (title){
    try {
      console.log("π§© Puzzle μμ±μ μμν©λλ€.");
      await Puzzle.create({
        title : title, 
        image : req.file.location,
        user : userObjectId
      })
      console.log("π§© Puzzle μμ±μ μλ£νμμ΅λλ€.");
      return res.status(200).json({ message : "π§© Puzzle μμ±μ μλ£νμμ΅λλ€."})
    } catch (error){
      return res
        .status(500)
        .json({ message: "π§© Puzzle μμ±μ μ€ν¨νμμ΅λλ€. νμ λ°μ΄ν° νμΈ ν λ°±μλ κ°λ°μμκ² λ¬Έμν΄μ£ΌμΈμ" + error });
    }
  } else {
    return res.status(403).json({ message : "π§© titleμ΄ μμ΅λλ€."})
  }
}


//πMaterials MultipleChoice κ΄λ ¨λ ν¨μ
export const createMultipleChoice = async (req, res) => {
  const {question, category, answer} = req.body;
  const userObjectId = await User.findOne({email : req.loggedInUser});

  let firstChoice
  let secondChoice

  //κ°κ΄μ λ¬Έμ κ° νκΈμΌλ!
  if (category == 1){
    firstChoice = req.body.firstChoice;
    secondChoice = req.body.secondChoice;    

  }else if (category == 2) {

    // TODO : λ€μ€νμΌ μ²λ¦¬νμ POSTMAN ν΄κ²°ν΄λ³Όκ²! 
    console.log("πreq.files μ°μ΄λ΄ ", req.files)
    console.log("ππreq.files[0] μ°μ΄λ΄ ", req.files[0])
    console.log("ππreq.files[1] μ°μ΄λ΄ ", req.files[1])
    
    if ( req.files.length === 0 ) {
      return res.status(500).json({ message: "π μ΄λ―Έμ§ νμΌμ΄ μ¬λ°λ₯΄κ² μ μ₯λμ§ μμ"});
    } 
    firstChoice = req.files[0].location;
    secondChoice = req.files[1].location;

  } else {
    return res.status(500).json({ message: "π MultipleChoice Category μ ν μ€ν¨"});
  }

  try {
    console.log("π MultipleChoice μμ±μ μμν©λλ€.");
    await MultipleChoice.create({
      question : question, 
      category : category,
      firstChoice : firstChoice,
      secondChoice : secondChoice, 
      answer : answer,
      user : userObjectId
    })
    console.log("π MultipleChoice μμ±μ μλ£νμμ΅λλ€.π");
    return res.status(200).json({ message : "π MultipleChoice μμ±μ μλ£νμμ΅λλ€.π"});
  } catch (error){
    return res.status(500).json({ message: "π MultipleChoice μμ±μ μ€ν¨νμμ΅λλ€. νμ λ°μ΄ν° νμΈ ν λ°±μλ κ°λ°μμκ² λ¬Έμν΄μ£ΌμΈμ : " + error});
  }
}


// π Materials Image λ€μ€νμΌ λ°μμ CREATE
export const createImage = async (req, res) => {
  const userObjectId = await User.findOne({email : req.loggedInUser});
  let imageList = []

  for(let num = 0; num < req.files.length; num++){
    imageList[num] = req.files[num].location
  }

  imageList.forEach((element) => {
    try {
      console.log("π©» Image μμ±μ μμν©λλ€.");
      Image.create({
        image : element, 
        user : userObjectId
      })
      console.log("π©» Image μμ±μ μλ£νμ΅λλ€.");
    } catch(error) {
        return res.status(500).json({ message: "Image μμ±μ μ€ν¨νμμ΅λλ€.β¨νμ λ°μ΄ν° νμΈ ν λ°±μλ κ°λ°μμκ² λ¬Έμν΄μ£ΌμΈμ : " + error});
    }
  })
  return res.status(200).json({ message : "π©» Image μμ±μ μλ£νμ΅λλ€."});
}


// export const createImage = async (req, res) => {
//   const userObjectId = await User.findOne({email : req.loggedInUser});

//   try {
//     console.log("π©» Image μμ±μ μμν©λλ€.");
//     await Image.create({
//       image : req.file.location,
//       user : userObjectId
//     })
//     console.log("π©» Image μμ±μ μλ£νμ΅λλ€");
//     return res.status(200).json({ message : "π©» Image μμ±μ μλ£νμ΅λλ€"})
//   } catch (error){
//     return res
//       .status(500)
//       .json({ message: "π©» Image μμ±μ μ€ν¨νμμ΅λλ€. νμ λ°μ΄ν° νμΈ ν λ°±μλ κ°λ°μμκ² λ¬Έμν΄μ£ΌμΈμ" + error });
//   } 
// }


//π ClassMaterial κ΄λ ¨ ν¨μ 
export const getClassMaterial = async (req, res) => {
  try {    
    const userObjectId = await User.findOne({ email : req.loggedInUser })
    const materialList = await Material.find({ users : userObjectId._id})
    return res.status(200).json({ classMaterial : materialList });
  }catch (err){
    return res.status(404).json({ message: "classMaterial" + err});
  }
}


export const createClassMaterial = async (req, res) => {
  const { title, puzzle, multipleChoice, image } = req.body
  const userObjectId = await User.findOne({email : req.loggedInUser})

  let today = new Date(); 
  let multipleChoiceList = []
  let puzzleList = []
  let imageList = []

    for(let i=0; i < puzzle.length; i++){
      puzzleList[i] = puzzle[i]
  }

    for(let i=0; i < multipleChoice.length; i++){
      multipleChoiceList[i] = multipleChoice[i]
  }  

    for(let i=0; i < image.length; i++){
      imageList[i] = image[i]
  }

  try {
    console.log("β¨Class Materials μμ±μ μμν©λλ€.");

    const test = await Material.create({
      title : title, 
      createdAt : today,
      users : userObjectId._id,
      puzzle : puzzleList,
      image : imageList,
      multipleChoice : multipleChoiceList
    })

    console.log("β¨Class Materials μμ±μ μλ£νμμ΅λλ€.β¨");
    return res.status(200).json({ message : "β¨Class Materials μμ±μ μλ£νμμ΅λλ€.β¨", "test" : test})
  
  } catch (error){
    return res.status(500).json({ message: "β¨Class Materials μμ±μ μ€ν¨νμμ΅λλ€.β¨νμ λ°μ΄ν° νμΈ ν λ°±μλ κ°λ°μμκ² λ¬Έμν΄μ£ΌμΈμ : " + error});
  }
}