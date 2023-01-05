// import aws from 'aws-sdk'
// import multer from 'multer'
// import multerS3 from 'multer-s3'
// import path from 'path'

// AWS.config.update({reginon: 'ap-northeast-2'});

// var s3 = new aws.S3()

// const allowedExtensions = ['.png', '.jpg', '.jpeg', 'bmp']

// const imageUploder = multer({
//   storage : multerS3({
//     s3 : s3,
//     bucket : 'kidsquizbucket',
//     acl : 'public-read',
//     contentType : multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
// });

// module.exports = upload;
