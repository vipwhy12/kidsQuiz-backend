// import User from "../models/Users"


export const join = (req, res) => res.send("Join");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");


export const postLogin = (req, res) => {
    // console.log(req);
    console.log(req.body);
    // const {email, password} = req.body;
    //   console.log(email, password); 
    res.json({ message: "OK!"})
}
  
export const postJoin = (req, res) => {
    res.send("Join");
  }