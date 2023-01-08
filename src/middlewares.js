import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export function verifyToken(req, res, next) {    
  console.log("verifyToken 호출! 🧨 ");
    try {
      req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
      console.error("검증된 토큰! 🔑", req.decoded);
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
  
