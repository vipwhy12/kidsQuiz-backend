import ClassMaterials from "../models/ClassMaterials.js"


export const getClassMaterials = async (req, res) => {
  // TODO : 
  
  // const findUser = await User.find({name : name, email : email});
  console.log(req.body);
  return res.status("200");
  // // console.log(findUser);
  // if(findUser == ""){
  //     console.log("🥲 회원이 아닙니다.");
  //     return res.status(403);
  // }else{
  //     await User.where({email : email}).update({password : tempPassword});
  //     return res.status("2s00").json({ tempPassword: tempPassword });
  // }
}



export const s3Test = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { body : {name}, file} = req;
  console.log(file);

  // console.log(file.path);
  // console.log(file.filename);
  console.log("🎃 된다요!!!");

}