import "./db.js";
import express from "express";
import morgan from "morgan";


import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import classRouter from "./routers/classRouter.js";
import userInfoRouter from "./routers/userInfoRouter.js";
import materialRouter from "./routers/materialRouter.js";
import { parse } from "path";
import bodyParser from "body-parser";
import multer from "multer"

// import liveRouter from "./routers/liveRouter.js";


const logger = morgan("dev");
const PORT = 3300;
const app = express();  

// app.use(bodyParser.json());
app.use(express.urlencoded({extended: false }));
// app.use(form_data.array());
app.use(express.text()); 
app.use(express.json()); //string을 받아서 json으로 바꿔주는 middleware (JSON.parse를 해준다고 생각하면 됨)

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/class", classRouter);
// app.use("/live", liveRouter);
app.use("/material", materialRouter);
app.use("/userinfo", userInfoRouter);

// app.post('test', upload.single('test'), funtion(req, res){
//   cons.log(req.file, req.body)
// });

const handleListening = () => console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀 `);
app.listen(PORT, handleListening);