import Class from "../models/LiveClasses.js"
import User from "../models/Users.js"
import {getUserId} from "../middlewares.js"

export const postCredential = async(req, res) => {
    console.log("postCredential 호출 🧤 ")
    const {password} = req.body; 
    
    const _id = await getUserId(req.loggedInUser);
    const user = await User.findById(_id); 
    if (!user) {
        return res.status(401).json({ message:"No usfer with the id😢 " });
       }
      if (user.password !== password) {
      return res.status(400).json({ message:"Password does not match 😢" });
      }
      return res.status(200).json({ message: "OK"})
}

export const getUserInfo = async(req, res) => {
    console.log("getUserInfo 호출 🧤 ")
    const _id = await getUserId(req.loggedInUser);

    const user = await User.findById(_id); 
    if (!user) {
        return res.status(401).json({ message:"No user with the id😢 " });
       }
       return res.status(200).send(user)

}


export const postUserInfo = async(req, res) => {
    console.log("postUserInfo 호출 🧤 ")
    const _id = await getUserId(req.loggedInUser);
    // const {name, password, phoneNumber, childOneName, childOneBirth, childTwoName, childTwoBirth} = req.body;
    const {name, password, phoneNumber} = req.body;
    console.log(name, password, phoneNumber)
    if (name == null || password== null || phoneNumber == null) {
        return res.status(400).json({ message:"There's missing information 😭" });
    }
    const updatedUserInfo = await User.findByIdAndUpdate(
        _id, 
        {
            name, 
            password, 
            phoneNumber
        }, 
        {new:true}); //new:true 를 하면 업데이트된 값을 리턴. (false 이면 바뀌기 전 값을 리턴)

    return res.status(200).send(updatedUserInfo);
}

export const deleteUser = async(req, res) => {
    const _id = await getUserId(req.loggedInUser);
    console.log("deleteUser 호출 🧤 ")
    const deletedUser = await User.findByIdAndDelete(_id);
    console.log("deletedUser ", deletedUser);
    if (!deletedUser) {
        return res.status(400).json({ message:"Found no user to delete 😭" });
    }
    //TODO: 이 유저가 생성했던 클래스와 교구들도 모두 삭제하는 로직 추가해야해!
    return res.status(200).send(deletedUser);
}

