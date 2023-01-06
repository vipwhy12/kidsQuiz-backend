import mongoose from "mongoose";

const LiveClassesSchema = new mongoose.Schema({
  title : {
    type : String,
    required: true
  },
  
  startDateTime :{
    type : Date, 
    required: true
  },

  studentMaxNum :{
    type : Number, 
    required: true
  },
    
  classKey :{
    type : String
  },

  classMaterial :{
    type : String
  }, 

  users : {
    type : mongoose.Schema.Types.ObjectId, 
    ref : "Users"
  }, 

  thumnail : {
    type : String,
    required: true
  }

});

const LiveClass = mongoose.model('liveClasses', LiveClassesSchema);
export default LiveClass;