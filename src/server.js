import "./db.js";
import express from "express"
import morgan from "morgan"

import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import classRouter from "./routers/classRouter.js";
import liveRouter from "./routers/liveRouter.js";
import materialRouter from "./routers/materialRouter.js";
import userInfoRouter from "./routers/userInfoRouter.js";

const logger = morgan("dev");
const PORT = 4000; // express application을 바로 사용할 수 있도록 return
const app = express();  

// 로깅 
app.use(logger);

// 라우터
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/class", classRouter);
app.use("/live", liveRouter);
app.use("/material", materialRouter);
app.use("/userinfo", userInfoRouter);

const handleListening = () => console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀 `);
app.listen(PORT, handleListening);