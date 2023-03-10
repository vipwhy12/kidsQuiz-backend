import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
import User from "./models/Users.js"


//π νμμ ObjectIdλ₯Ό λ°ν
export const getUserId = async(email)=> {
  const userId = await User.findOne({email:email}) ;
  if (userId == null){
    return null
  } 
  return userId._id
}

// π Token κ΄λ ¨ MiddleWareμλλ€.
export function verifyToken(req, res, next) {    
  console.log("verifyToken νΈμΆ! π§¨ ");

  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log("κ²μ¦λ ν ν°! π", req.decoded);
    console.log("ν ν°μ id! π", req.decoded.id);
    req.loggedInUser = req.decoded.id; 
    req.query = req.query;
    return next();
  }
    
    // μΈμ¦ μ€ν¨ 
  catch(error) {
    console.error("ν ν° κ²μ¦ μ€ μλ¬ λ°μ. π");

    if (error.name === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: 'ν ν°μ΄ λ§λ£λμμ΅λλ€.'
      });
    }
    return res.status(401).json({
      code: 401,
      message: 'μ ν¨νμ§ μμ ν ν°μλλ€.'
    });
  }
}

export const cors = (req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Cross-Origin-Opener-Policy", "cross-origin");
  res.header("Access-Control-Allow-Origin", "*"); //Todo: λμ€μ μ°λ¦¬ νλ‘ νΈ μλ²μ λν΄μλ§ νμ©! 
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
  acl: "public-read",// ACL(κ°μ²΄μ λν μ κ·Ό κΆν). public-readλ‘ μ λ¬ν΄μΌ files are publicly-read. 
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})


export const avatarUploadHandler = (req, res, next) => {
  console.log("avatarUploaderπππ")
  const avatarUpload = multer({
  dest : "uploads/", 
  limits : {
    fileSize: 3000000, //λ¨μλ byte (= 3MB)
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
        fileSize: 3000000, //λ¨μλ byte (= 3MB)
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
// 			fileSize: 300000000, //λ¨μλ byte (= 3MB)
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



