import mongoose from "mongoose";

const PuzzleSchema = new mongoose.Schema({
  image :{
    type : String,
    required: true
  },

  material :{
    type : String,
    required: true
  }, 

  rows :{
    type : int,
    required : ture
  }, 
  
  columns:{
    type : int,
    required : ture
  }
});


module.exports = Puzzle;