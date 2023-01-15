import mongoose from "mongoose";

const MultipleChoiceSchema = new mongoose.Schema({  
  question : { type : String, required : true },
  category : {type : Number, required : true}, 
  fistChoice:{ type : String, required: true },
  secondChoice:{ type : String, required: true }, 
  answer :{ type : Number, required: true }, 
  user : { 
    type : mongoose.Schema.Types.ObjectId,
    ref : "Users",
    require : true
  }
});

const MultipleChoice = mongoose.model('MultipleChoice', MultipleChoiceSchema);
export default MultipleChoice;

