import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  email:{type : String, trim : true, unique : true, required : true },
  name:{type : String, required: true },
  password:{type : String, required: true },
  phoneNumber:{type : String, required: true  },

  children:[{
    childName:{type: String},
    childBirth:{type: Date}
  }],

  liveClasses:[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "LiveClasses"
  }], 

  classMaterials:[{
    type : mongoose.Schema.Types.ObjectId, 
    ref:"ClassMaterials"
  }],

  materials:[{
    type : mongoose.Schema.Types.ObjectId, 
    ref:"Materials"
  }]
  
});

const User = mongoose.model('Users', UsersSchema);
export default User;