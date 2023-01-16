import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
import User from "./models/Users.js"


//👇 회원의 ObjectId를 반환
export const getUserId = async(email)=> {
  const userId = await User.findOne({email:email}) ;
  if (userId == null){
    return null
  } 
  return userId._id
}

// 👇 Token 관련 MiddleWare입니다.
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
    console.error("토큰 검증 중 에러 발생. 💊");
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

const s3 = new aws.S3 ({
  credentials: {
    accessKeyId : process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY
  }
})

const s3imageUploader = multerS3 ({
  s3:s3,
  bucket: "kidsquizbucket/upload", 
  acl: "public-read",// ACL(객체에 대한 접근 권한). public-read로 전달해야 files are publicly-read. 
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})


export const avatarUploadHandler = (req, res, next) => {
  const avatarUpload = multer({
  dest : "uploads/", 
  limits : {
    fileSize: 3000000, //단위는 byte (= 3MB)
  },
  storage: s3imageUploader,
}).single('image');

  avatarUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err)
        return res.status(400).send("s3 Upload Multer Error")			// A Multer error occurred when uploading.
      } else if (err) {
        console.log(err)
        return res.status(400)	  // An unknown error occurred when uploading.
      }
      next()
  })
}


export const s3ImagesUploadHandler = (req, res, next) => {
    const avatarUpload = multer({
      dest:"uploads/", 
      limits : {
        fileSize: 3000000, //단위는 byte (= 3MB)
      },
      storage: s3imageUploader,
    }).array('image');
    
    avatarUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log(err)
          return res.status(400).send("s3 Upload Multer Error")			// A Multer error occurred when uploading.
        } else if (err) {
          console.log(err)
          return res.status(400)	  // An unknown error occurred when uploading.
        }
      next()
    })
  }


// export const s3ImageUploadHandler = (req, res, next) => {
// 	const imageUploader = multer({
// 		dest:"uploads/", 
// 		limits : {
// 			fileSize: 300000000, //단위는 byte (= 3MB)
// 		},
// 		acl: "public-read",
// 		storage: s3imageUploader,
// 	}).single('image');
	
// 	imageUploader(req, res, function (err) {
// 		if (err instanceof multer.MulterError) {
// 			console.log(err)
// 			return res.status(400).send("s3 Upload Multer Error")			// A Multer error occurred when uploading.
// 		} else if (err) {
// 			console.log(err)
// 			return res.status(400)	  // An unknown error occurred when uploading.
// 		}
// 		next()
// 	})
// };



