// import mongoose from "mongoose";

// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'REGION'});
// // Create S3 service object
// s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

// mongoose.connect("mongodb://10.0.10.84:27017",{
// 	useNewUrlParser:true, 
// 	useUnifiedTopology:true, 
// 	} //두번째 인자 부분은 아래에서 설명
// );

// const handleOpen = () => console.log("✅ Connected to DB");
// const handleError = (error) => console.log("❌ DB Error", error) 
// db.once("open", handleOpen); //open 이벤트가 발생 시 handleOpen 실행 
// db.on("error", handleError); //error 이벤트가 발생할 때마다 handleError 실행 ); 
// const db = mongoose.connection;



// const PuzzleSchema = new mongoose.Schema({
//   puzzleId :{ 
//     type : String,
//     required: true, 
//     unique: true
//   }, 
  
//   image :{
//     type : String,
//     required: true
//   },

//   material :{
//     type : String,
//     required: true
//   }
// });

// //정의된 스키마를 객체처럼 사용할 수 있도록 model 함수로 컴파일
// const Puzzle = mongoose.model('Puzzle', PuzzleSchema);

// var newPuzzle = new Puzzle({puzzleId:'01040549', image:'이미지 테스트', material:'이미지'});

// newPuzzle.save(function(error, data){
//   if(error){
//       console.log(error);
//   }else{
//       console.log('Saved!')
//   }
// });

// Puzzle.find(function(error, puzzles){
//   console.log('--- Read all ---');
//   if(error){
//       console.log(error);
//   }else{
//       console.log(puzzles);
//   }
// })

// // module.exports = Puzzle;