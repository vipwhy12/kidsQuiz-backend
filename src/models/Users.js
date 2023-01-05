// import mongoose from "mongoose";

// const UsersSchema = new mongoose.Schema({
//   userId:{ 
//     type : String,
//     required: true, 
//     unique: true
//   }, 
  
//   email:{
//     type : String,
//     trim : true,
//     unique : true,
//     required : true
//   },

//   name:{
//     type : String,
//     required: true
//   },

//   password:{
//     type : String,
//     required: true
//   },

//   phoneNumber:{
//     type : String,
//     required: true
//   }

//   // children:[{
//   //   childrenName:{type: String},
//   //   childrenAge:{type: Data}
//   // }],

//   // liveClasses:[{
//   //   type : mongoose.Schema.Types.ObjectId,
//   //   ref : "LiveClasses"
//   // }], 

//   // classMaterials:[{
//   //   type : mongoose.Schema.Types.ObjectId, 
//   //   ref:"ClassMaterials"
//   // }],

//   // materials:[{
//   //   type : mongoose.Schema.Types.ObjectId, 
//   //   ref:"Materials"
//   // }]
  
// });


// const Users = mongoose.model('Users', UsersSchema);
// module.exports = Users;