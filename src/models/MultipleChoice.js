// import mongoose from "mongoose";

// const MultipleChoiceSchema = new mongoose.Schema({
//   multipleChoiceId:{ 
//     type : String,
//     required: true, 
//     unique: true
//   }, 
  
//   question:{
//     type : String,
//     required : true
//   },

//   fistChoiceText:{
//     type : String,
//     required: true
//   },

//   fistChoiceImage:{
//     type : String,
//     required: true
//   },

//   SecondChoiceText:{
//     type : String,
//     required: true
//   }, 
  
//   SecondChoiceImage:{
//     type : String,
//     required: true
//   }, 
  
//   materials:[{
//     type : String, 
//     ref : "Materials"
//   }]

// });


// const Users = mongoose.model('Users', UsersSchema);
// module.exports = Users;