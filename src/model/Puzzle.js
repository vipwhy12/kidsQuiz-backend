import mongoose from "mongoose";

const PuzzleSchema = new mongoose.Schema({
  puzzleId :{ 
    type : String,
    required: true, 
    unique: true
  }, 
  
  image :{
    type : String,
    required: true
  },

  material :{
    type : String,
    required: true
  }
});


const Puzzle = mongoose.model('Puzzle', PuzzleSchema);
module.exports = Puzzle;