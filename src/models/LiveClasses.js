import mongoose from "mongoose";

const LiveClassesSchema = new mongoose.Schema({
  title : {type : String, required: true},
  startDateTime :{type : Date, required: true},
  studentMaxNum :{type : Number,  required: true},
  classMaterial :{
    type : mongoose.Schema.Types.ObjectId, 
    ref : "Material"
  } ,
  thumbnail : {type : String, required: true}, 
  user : {
    type : mongoose.Schema.Types.ObjectId, 
    ref : "Users"
  }, 
});

const LiveClass = mongoose.model('liveClasses', LiveClassesSchema);
export default LiveClass;