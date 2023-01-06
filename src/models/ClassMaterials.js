import mongoose from "mongoose";

const ClassMaterialsSchema = new mongoose.Schema({
  title : {
    type : String,
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
  }

});

const ClassMaterial = mongoose.model('ClassMaterials', ClassMaterialsSchema);
module.exports = ClassMaterial;
