import User from "../models/Users.js";
import Material from "../models/Materials.js";
import Puzzle from "../models/Puzzles.js";
import Image from "../models/Images.js";
import MultipleChoice from "../models/MultipleChoice.js";


export const readliveImage = async (req, res) => {
  try {
    const _id = req.body._id
    const findMaterial = await Material.findById(_id)

    let imageList = findMaterial.image
    let liveImageList = []
    
    for(let i = 0; i < liveImageList.length ;i++){
      liveImageList[i] = await Image.findById(imageList[i])
    }

    console.log("✨live Image 조회 성공.✨")
    return res.status(200).json({ images : liveImageList })
  }catch(error) {
    return res.status(500).json({ message: "✨live Image 조회 실패 : " + error});
  }
}


export const readlivePuzzle = async (req, res) => {
  try {
    const _id = req.body._id
    const findMaterial = await Material.findById(_id)

    let puzzleList = findMaterial.puzzle
    let livePuzzleList = []

    for(let i = 0; i < puzzleList.length ;i++){
      livePuzzleList[i] = await Puzzle.findById(puzzleList[i])
    }
    console.log("✨live Puzzle 조회 성공.✨")
    return res.status(200).json({ puzzle : livePuzzleList})
  }catch(error) {
    return res.status(500).json({ message: "✨live Puzzle 조회 실패 : " + error});
  }
}

export const readMultipleChoice = async (req, res) => {
  try {
    const _id = req.body._id
    const findMaterial = await Material.findById(_id)

    console.log(findMaterial);

    let multipleChoiceList = findMaterial.multipleChoice
    let liveMultipleChoiceList = []

    for(let i = 0; i < multipleChoiceList.length ;i++){
      liveMultipleChoiceList[i] = await MultipleChoice.findById(multipleChoiceList[i])
    }

    console.log("✨live MultipleChoice  조회 성공.✨")
    return res.status(200).json({ multipleChoice : liveMultipleChoiceList})
  }catch(error) {

    return res.status(500).json({ message: "✨MultipleChoice 조회 실패 : " + error});
  }
}