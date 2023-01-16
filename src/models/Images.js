import mongoose from "mongoose";

const ImagesSchema = new mongoose.Schema({
  image : [{ type : String, required: true}],
  user : { 
    type : mongoose.Schema.Types.ObjectId,
    ref : "Users",
    require : true
  }
});

const Image = mongoose.model('Images', ImagesSchema);
export default Image;