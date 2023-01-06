import mongoose from "mongoose";

mongoose.connect("mongodb://10.0.10.84:27017",{
	useNewUrlParser:true, 
	useUnifiedTopology:true, 
	}
);

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error) 
db.once("open", handleOpen); //open 이벤트가 발생 시 handleOpen 실행 
db.on("error", handleError); //error 이벤트가 발생할 때마다 handleError 실행 ); 
const db = mongoose.connection;

const PuzzleSchema = new mongoose.Schema({
  image :{
    type : String,
    required: true
  },

  material :{
    type : String,
    required: true
  }, 

  rows :{
    type : int,
    required : ture
  }, 
  
  columns:{
    type : int,
    required : ture
  }
});

//정의된 스키마를 객체처럼 사용할 수 있도록 model 함수로 컴파일
const Puzzle = mongoose.model('Puzzle', PuzzleSchema);

var newPuzzle = new Puzzle({puzzleId:'01040549', image:'이미지 테스트', material:'이미지'});

newPuzzle.save(function(error, data){
  if(error){
      console.log(error);
  }else{
      console.log('Saved!')
  }
});

Puzzle.find(function(error, puzzles){
  console.log('--- Read all ---');
  if(error){
      console.log(error);
  }else{
      console.log(puzzles);
  }
})

// module.exports = Puzzle;