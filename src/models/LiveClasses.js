import mongoose from "mongoose";

const LiveClassesSchema = new mongoose.Schema({
  classID:{
    type : int,
    required: true, 
    unique: true
  },

  title : {
    type : Stirng,
    required: true
  },
  
  startDateTime :{
    type : Date, 
    required: true
  },

  studentMaxNum :{
    type : int, 
    required: true
  },

  invitationLink :{
    type : String,
    required: true
  },
  
  classKey :{
    type : String
  },

  classMaterial :{
    type : mongoose.Schema.Types.ObjectId, 
    ref : "ClassMaterials"
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
module.exports = LiveClass;