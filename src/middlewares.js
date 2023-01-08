import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
import User from "./models/Users.js"

export const getUserId = async(email)=> {
  const userId = await User.findOne({email:email}) ;
  if (userId == null){
    return null
  } 
  return userId._id
}

export function verifyToken(req, res, next) {    
  console.log("verifyToken 호출! 🧨 ");
    try {
      req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
      console.log("검증된 토큰! 🔑", req.decoded);
      console.log("토큰의 id! 🔑", req.decoded.id);
      req.loggedInUser = req.decoded.id; 
      return next();
    }
    
    // 인증 실패 
    catch(error) {
      console.error("토큰 검증 중 에러 발생. 💊 Details:", error);
      if (error.name === 'TokenExpireError') {
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다.'
        });
      }
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다.'
      });
    }
  }

  export const cors = (req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "credentialless");
    res.header("Cross-Origin-Opener-Policy", "cross-origin");
	  res.header("Access-Control-Allow-Origin", "*"); //Todo: 나중에 우리 프론트 서버에 대해서만 허용! 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", true);
	console.log("CORS is working ")
    next();
    };

  export const publicOnly = (req,res,next) => {
    if(!req.session.loggedIn) {
      return next();
    } else {
      return res.redirect("/");
    }
  }

