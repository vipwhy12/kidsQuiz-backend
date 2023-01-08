import "./db.js";
import express from "express"
import morgan from "morgan"

import dotenv from "dotenv"
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import classRouter from "./routers/classRouter.js";
// import liveRouter from "./routers/liveRouter.js";
// import materialRouter from "./routers/materialRouter.js";
import userInfoRouter from "./routers/userInfoRouter.js";
import { cors } from "./middlewares.js";


dotenv.config();
const secretKey = process.env.JWT_SECRET

const logger = morgan("dev");
const app = express();  
const PORT = 4000;


app.use(logger);

app.use(express.urlencoded({extended: true}));
app.use(express.text()); 
app.use(express.json()); //string을 받아서 json으로 바꿔주는 middleware (JSON.parse를 해준다고 생각하면 됨)

app.use(cors);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/class", classRouter);
// app.use("/live", liveRouter);
// app.use("/material", materialRouter);
app.use("/userinfo", userInfoRouter);

const handleListening = () => console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀 `);
app.listen(PORT, handleListening);