import User from "./models/Users.js"

import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";


dotenv.config()

//👇 회원의 ObjectId를 반환
export const getUserId = async(email) => {
	const userId = await User.findOne({email : email});
	if(userId){	return userId._id }
	return null
}

// 👇 Token 관련 MiddleWare입니다.
export const checkToken = (req, res, next) => {
	if(req.headers["authorization"] ==  undefined){
    return res.status(403).send("🥲 토큰이 없습니다. 토큰을 유무를 확인해주세요.");
  } 
	const bearer = req.headers["authorization"].split(" ");
	req.UserEmail = jwt.decode(bearer[1]).id;
	return next();
}

// 👇 Materials 관련 MiddleWare입니다.
const s3 = new aws.S3 ({
	credentials: {
		accessKeyId : process.env.AWS_ID,
		secretAccessKey: process.env.AWS_KEY
	}
})

const s3imageUploader = multerS3({
	s3 : s3,
	bucket: "kidsquizbucket/upload", 
	acl : "public-read",
	contentType: multerS3.AUTO_CONTENT_TYPE
})


export const s3ImageUploadHandler = (req, res, next) => {
	const imageUploader = multer({
		dest:"uploads/", 
		limits : {
			fileSize: 300000000, //단위는 byte (= 3MB)
		},
		acl: "public-read",
		storage: s3imageUploader,
	}).single('image');
	
	imageUploader(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			console.log(err)
			return res.status(400).send("s3 Upload Multer Error")			// A Multer error occurred when uploading.
		} else if (err) {
			console.log(err)
			return res.status(400)	  // An unknown error occurred when uploading.
		}
		next()
	})
};




	// const avatarUpload = multer({
	// 	storage: multerS3({
	// 		s3: s3,
	// 		bucket: 'kidsquizbucket',
	// 		acl: 'public-read',
	// 		contentType: multerS3.AUTO_CONTENT_TYPE,
	// 	}),
	// });

	// console.log(s3imageUploader);
	
	// avatarUpload(req, res, function(err){
	// 	next();
	// })


//middleware.js







// export const avatarUploadHandler= (req, res, next) => {
// 	const avatarUpload = multer({
// 	dest:"uploads/avatars", 
// 	limits : {
// 		fileSize: 3000000, //단위는 byte (= 3MB)
// 	},
// 	storage: isHeroku? s3imageUploader : undefined,
// }).single('avatar');
	// avatarUpload(req, res, function (err) {
	// 		if (err instanceof multer.MulterError) {
	// 				return res.render(
	// 		"edit-profile",
	// 		{pageTitle: "Error", errorMessage:"Your file is too big. Please use the file less than 3MB"}
	// 		)			// A Multer error occurred when uploading.
	// 		} else if (err) {
	// 	return res.render(
	// 		"edit-profile",
	// 		{pageTitle: "Error", errorMessage:"Unknown Error. Sorry."}
	// 		)            // An unknown error occurred when uploading.
	// 		}
	// 		next()
// 	})
// }
