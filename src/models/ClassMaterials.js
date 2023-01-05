import mongoose from "mongoose";

const ClassMaterialsSchema = new mongoose.Schema({
  classMaterialId:{
    type : int,
    required: true, 
    unique: true
  },

  title : {
    type : Stirng,
    required: true
  },

  materials:[{
    type : mongoose.Schema.Types.ObjectId,  
    ref : "Materials"
  }], 

  createdAt : {
    type : Date,
    required: true
  }, 
  
  users : {
    type : mongoose.Schema.Types.ObjectId,  
    require : true,
    ref : "Users"
  },

  liveClass:[{
    type : mongoose.Schema.Types.ObjectId, 
    ref : "LiveClasses"
  }]

});

const ClassMaterial = mongoose.model('ClassMaterials', ClassMaterialsSchema);
module.exports = ClassMaterial;