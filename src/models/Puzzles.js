import mongoose from "mongoose";

const PuzzlesSchema = new mongoose.Schema({
  title : { type : String, require : true},
  image : { type : String, required: true},
  rows : { type : Number, required : true },
  columns : { type : Number, required : true},
  user : { 
    type : mongoose.Schema.Types.ObjectId,
    ref : "Users",
    require : true
  }
});

const Puzzle = mongoose.model('Puzzles', PuzzlesSchema);
export default Puzzle;