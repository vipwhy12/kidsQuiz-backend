import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
  materialId:{ 
    type : String,
    required: true, 
    unique: true
  }, 
  
  name:{
    type : String,
    required : true
  },

  type:{
    type : String,
    required: true
  },

  content:{
    type : mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref:"ClassMaterials"
  },

  createAt:{
    type : date,
    required: true
  },

  users : {
    type : String,
    require : true,
    ref : "Users"
  }, 

  classMaterial : {
    type : mongoose.Schema.Types.ObjectId, 
    require : true,
    ref : "ClassMaterials"
  }
});


const Material = mongoose.model('Material', MaterialSchema);
module.exports = Material;