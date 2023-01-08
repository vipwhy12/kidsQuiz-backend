import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv"
dotenv.config()

const s3 = new aws.S3 ({
	credentials: {
		accessKeyId : process.env.AWS_ID,
		secretAccessKey: process.env.AWS_PW
	}
})

const s3imageUploader = multerS3({
	s3 : s3,
	bucket: "kidsquizbucket/upload", 
	acl : "public-read",
	contentType: multerS3.AUTO_CONTENT_TYPE
})


// const s3imageUploader = multerS3({
// 	s3:s3,
// 	bucket: "kidsquizbucket/upload",
// 	acl: "public-read",
// 	storage: s3imageUploader,
// 	contentType : AUTO_CONTENT_TYPE
// }).single('test');

// export const s3imageUploader = multerS3 ({
// 	s3:s3,
// 	bucket: "kidsquizbucket/upload", // image 디렉토리로 지정 
// 	acl: "public-read",// ACL(객체에 대한 접근 권한). public-read로 전달해야 files are publicly-read. 
// 	contentType : AUTO_CONTENT_TYPE
// })

export const s3imageUploadHandler = (req, res, next) => {
	console.log(req.file);
	const imageUploader = multer({
		dest:"uploads/", 
		limits : {
			fileSize: 300000000, //단위는 byte (= 3MB)
		},
		acl: "public-read",
		storage: s3imageUploader,
	}).single('test');
	
	// imageUploader(req, res, function(err){
	// 	console.log("에러?",err);
	// 	next();
	// });
	imageUploader(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			console.log(err)
			return res.status(400).send("s3 Upload Multer Error")			// A Multer error occurred when uploading.
		} else if (err) {
			console.log(err)
			return res.status(400)	  // An unknown error occurred when uploading.
		}
		// next()
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
