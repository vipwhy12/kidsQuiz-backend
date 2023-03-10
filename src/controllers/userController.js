
import User from "../models/Users.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const postLogin = async(req, res) => {
    const {email, password} = req.body;
    console.log("POST LOGIN ๐งค :", email, password); 
    const user = await User.findOne({email});  //emailํค์ ๊ฐ์ด (๋ณ์)email ์ธ ๊ฒ ์ฐพ์ 
    console.log(user);
    
    //๋น๋ฐ๋ฒํธ ์ผ์นํ๋์ง ํ์ธ 
    if (!user) {
        return res.status(401).json({ message:"No user with the information๐ข" });
    }
    if (user.password !== password) {
    return res.status(401).json({ message:"Password does not match ๐ข" });
    }
    const name = user.name
    console.log("์ ์  ์ด๋ฆ๐ฅ", name)
    //! ๐ ํ ํฐ ๋ฐ๊ธ
    try {
        const id = email;  
        const token = jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: "660m", // 60๋ถ
            issuer: "snowball"
        });
        return res.status(200).json({message: '๐ ํ ํฐ์ด ๋ฐ๊ธ๋์์ต๋๋ค.', token , name});
        }
    catch (error) {
        console.error("ํ ํฐ ๋ฐ๊ธ ์ค ์๋ฌ ๋ฐ์. ๐ Details:", error);
        return res.status(500).json({message: '์๋ฒ ์๋ฌ'});
    }
}

export const postJoin = async(req, res) => {
    console.log(req.body);
    // const {email, name, password, phoneNumber, childOneName, childOneBirth, childTwoName, childTwoBirth} = req.body;
    // console.log(email, name, password, phoneNumber, childOneName, childOneBirth, childTwoName, childTwoBirth)
    const {email, name, password, phoneNumber} = req.body;
    console.log(email, name, password, phoneNumber)

    //ํ์๊ฐ ์ค ๋น ์ง ๊ฐ์ด ์๋์ง ํ์ธ 
    if (email == null || name == null || password== null ||  phoneNumber == null) {
        return res.status(400).json({ message:"There's missing information ๐ญ" });
    }
    //์ด๋ฉ์ผ์ด ์กด์ฌํ๋์ง ํ์ธ 
    const existing = await User.exists({email});
    if (existing) {
        return res.status(401).json({ message:"User with the email address already exists" });
    }
    // const children= [{
    //                 childName: childOneName,
    //                 childBirth: childOneBirth,
    //             }, {
    //                 childName: childTwoName,
    //                 childBirth: childTwoBirth,
    //             }]
    // console.log(children)
    try{
        console.log("ํ์์์ฑ ์์");
        await User.create({
            email, 
            name, 
            password, 
            phoneNumber
        });
        console.log("ํ์์์ฑ ์๋ฃ");
        const joinedUser = await User.findOne({email})
        console.log("ํ์ ๊ฐ์๋ ์ ์ ๋ : " ,joinedUser);
        return res.status(200).send(joinedUser);
    } catch(error) {
        return res.status(500).json({ message:"we faced a problem as creating user" });
    }
}

export const findId = async (req, res) => {
  // TODO : (์์ด๋ ์ฐพ๊ธฐ)ํธ๋ํฐ ์ธ์ฆ์ผ๋ก ํ์ ํ์ธ ํ, ํ์ id ๋ฐํ
  const { name, phoneNumber } = req.body;
  const findUser = await User.find({
    name: name,
    phoneNumber: phoneNumber,
  }).exec();

  if (findUser == "") {
    console.log("๐ฅฒ ํ์์ด ์๋๋๋ค.");
    return res.status(403);
  } else {
    const userEmail = findUser[0].email;
    return res.status("200").json({ userEmail: userEmail });
  }
};

export const findPw = async (req, res) => {
  // TODO : (๋น๋ฐ๋ฒํธ ์ฐพ๊ธฐ) ์์ ๋น๋ฐ๋ฒํธ ์ํธํ & ์์ ๋น๋ฐ๋ฒํธ ์ด๋ฉ์ผ ์ ์ก๊ธฐ๋ฅ ์ถ๊ฐ
  const { name, email } = req.body;
  const findUser = await User.find({ name: name, email: email });

  console.log(name, email);
  // console.log(findUser);
  if (findUser == "") {
    console.log("๐ฅฒ ํ์์ด ์๋๋๋ค.");
    return res.status(403);
  } else {
    const tempPassword = Math.random().toString(36).substring(2, 12);
    await User.where({ email: email }).update({ password: tempPassword });
    return res.status("200").json({ tempPassword: tempPassword });
  }
};
