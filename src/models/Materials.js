import mongoose from "mongoose";

const MaterialsSchema = new mongoose.Schema({
  name:{ type : String, required : true},
  type:{ type : String, required: true},


  content:{
    type : mongoose.Schema.Types.ObjectId, 
    required: true, 
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


const Material = mongoose.model('Materials', MaterialsSchema);
module.exports = Material;