// function image() {
//   const requestImg = async (event) => {
//     // form tag를 사용하지 않아도 formdata를 만들 수 있습니다.
//     let formData = new FormData();
//     formData.append('image', event.target.files[0]);
//     // 생성한 폼 데이터에 파일 객체를 할당하고, 서버에 요청을 보냅니다.
//     try {
//       const imageRes = await axios.post(`localhost:4000/image`, formData);
//     } catch (error) {
//       console.log(error);
//       alert('server error');
//     }
//   };
//   return (
//     <Wrap>
//       <div id='imageEdit'>
//         <input
//           type='file'
//           id='image_uploads'
//           name='image'
//           accept='image/*'
//           onChange={requestImg}
//         ></input>
//       </div>
//     </Wrap>
//   );
// }


// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'REGION'});
// // Create S3 service object
// s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });