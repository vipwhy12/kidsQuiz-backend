import express from "express"
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";

const PORT = 4000; // express application을 바로 사용할 수 있도록 return
const app = express();  
const logger = (req, res, next) => {
    console.log(`😎 ${req.method} ${req.url}`)
    next();
}  
app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);

const handleListening = () => console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀 `);

app.listen(4000, handleListening);


// const privateMiddleware = (req, res, next)=> {
//     const url = req.url;
//     if(url === "/protected"){
//         return res.send("<h1>Not Allowed</h1>")
//     }
//     next();
// }
