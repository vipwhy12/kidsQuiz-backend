import mongoose from "mongoose";

console.log(process.platform);
let dbAddr = "10.0.10.84"
if (process.platform != "linux") {
	dbAddr = "127.0.0.1"
}
console.log(dbAddr);

mongoose.connect(`mongodb://${dbAddr}:27017/kidsquiz`,{
	useNewUrlParser:true, 
	useUnifiedTopology:true, 
	} //두번째 인자 부분은 아래에서 설명
);

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error) 
db.once("open", handleOpen); //open 이벤트가 발생 시 handleOpen 실행 
db.on("error", handleError); //error 이벤트가 발생할 때마다 handleError 실행 ); 


//🌟유나 DB 추가
// import mongoose from "mongoose";

// // mongoose.connect("mongodb://10.0.10.84:27017",{
// mongoose.connect("mongodb://127.0.0.1:27017/kidsquiz",{
// 	useNewUrlParser:true, 
// 	useUnifiedTopology:true, 
// 	} //두번째 인자 부분은 아래에서 설명
// );
// const db = mongoose.connection;
// const handleOpen = () => console.log("✅ Connected to DB");
// const handleError = (error) => console.log("❌ DB Error", error) 
// db.once("open", handleOpen); //open 이벤트가 발생 시 handleOpen 실행 
// db.on("error", handleError); //error 이벤트가 발생할 때마다 handleError 실행 ); 