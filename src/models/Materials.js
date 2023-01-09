import mongoose from "mongoose";

const MaterialsSchema = new mongoose.Schema({
  title : { type : String, required: true },
  createdAt : { type : Date, required: true }, 
  
  users : {
    type : mongoose.Schema.Types.ObjectId,  
    require : true,
    ref : "Users"
  },

  puzzle : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Puzzles"
  }],

  multipleChoice : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "multiple_choice"
  }]

});

const Material = mongoose.model('Materials', MaterialsSchema);
export default Material;
