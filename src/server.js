import express from "express"

const PORT = 4000;
const app = express();


const logger = (req, res, next) => {
    console.log(`😎 ${req.method} ${req.url}`)
    next();
}

const privateMiddleware = (req, res, next)=> {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>")
    }
    next();
}

const handleHome = (req, res ) => {
    return res.end();
}

const handelProtected = (req, res)=>{
    return res.send("☺️Welcome to private rounge");
}

app.use(logger);        //어느 URL에서도 작동하는 middleware
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handelProtected);

const handleListening = () => 
    console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀 `);

app.listen(4000, handleListening);