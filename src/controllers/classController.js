import Class from "../models/LiveClasses.js"
import User from "../models/Users.js"
import {getUserId} from "../middlewares.js"

export const getClassList = async(req, res) => {
    console.log("getClassList 호출 🧤 ")
    const { id } = req.params; //id 는 유저 id
    const loggedInUser = await getUserId(req.loggedInUser);
    if (loggedInUser != id ){
        return res.status(401).json({ message:"You have no right to see the classinfo 😤 " });
    }

    const user = await User.findOne({_id:id});
    if (!user){
        return res.status(401).json({ message:"There's no such User 😢" });
    } 
    let today = new Date();   
    console.log("현재 시간: ⏰",today);
    const classes = await Class.find({user:id, startDateTime: { $gte: today } })
    return res.status(200).json(classes)
}

export const getClass = async(req, res) => {
    console.log("getClass 호출 🧤 ")
    const { id } = req.params; //id는 클래스 id 
    const user = await getUserId(req.loggedInUser);
    const classFound = await Class.findById(id);
    console.log("classFound는", classFound)
    if (classFound == "" || classFound == null) {
        return res.status(401).json({ message:"Can't found the Class 😢" });
    }
    if (classFound._id != user) {
        return res.status(401).json({ message:"You have no right to see the classinfo 😤 " });
    }

    return res.status(200).json(classFound);
}

export const postNewClass = async(req,res) => {
    console.log("getPostNewClass 호출 🧤 ")
    // console.log("로그인한 유저는!!!!! 🙊🙊🙊", req.loggedInUser);
    const user = await getUserId(req.loggedInUser);
    // console.log("로그인한 유저ID는!!!!! 🙊🙊🙊", user);
    const {title, startDateTime, studentMaxNum, classKey, classMaterial, thumbnail} = req.body;
    console.log("postJoin 호출", title, startDateTime, studentMaxNum, classKey, classMaterial, thumbnail);
    
    if (!title || !startDateTime || studentMaxNum<=0 || !thumbnail ) {
        return res.status(400).json({ message:"There's missing information 😭" });
    }
    // 이 유저가 생성한 클래스 중 겹치는 시간이 있는지 확인 
    const sameDateTime = await Class.findOne({startDateTime, user})
    if (sameDateTime) {
        return res.status(401).json({ message:"You already have the class in the same date and time 😭" });
    }

    try{
        console.log("클래스 생성 시작");
         await Class.create({
            title, 
            startDateTime, 
            studentMaxNum, 
            classKey, 
            classMaterial, 
            thumbnail, 
            user
        });
        console.log("클래스 생성 완료");
        
        const ClassCreated = await Class.findOne({startDateTime, user})
        console.log("새로 생성된 클래스는", ClassCreated);
        return res.status(200).send(ClassCreated);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message:"we faced a problem as creating a new class" });
    }

}
export const postClass = async(req,res) => {
    console.log("postClass 호출 🧤 ")

    const _id  = req.params.id; //id는 클래스 id 
    const {title, startDateTime, studentMaxNum, classKey, classMaterial, thumbnail} = req.body;
    
    const user = await getUserId(req.loggedInUser);

    const classFound = Class.findById(_id); 
    if (classFound._id != user) {
        return res.status(401).json({ message:"You have no right to update the class 😤 " });
    }

    const sameDateTime = await Class.findOne({startDateTime, user})
    if (sameDateTime && sameDateTime._id != _id ) {
        return res.status(401).json({ message:"You already have the class in the same date and time 😭" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
        _id, 
        {
            title, 
            startDateTime, 
            studentMaxNum, 
            classKey, 
            classMaterial, 
            thumbnail, 
            user 
        }, 
        {new:true}); //new:true 를 하면 업데이트된 값을 리턴. (false 이면 바뀌기 전 값을 리턴)

    return res.status(200).send(updatedClass);
}
export const deleteClass  = async(req,res) => {
    console.log("deleteClass 호출 🧤 ")
    const { id } = req.params; //id는 클래스 id 
    const user = await getUserId(req.loggedInUser);
    const classFound = Class.findById(id); 
    if (classFound._id != user) {
        return res.status(401).json({ message:"You have no right to delete the class 😤 " });
    }

    const deletedClass = await Class.findByIdAndDelete(id);
    console.log("deletedClass는 ", deletedClass);
    if (!deletedClass) {
        return res.status(401).json({ message:"Found no class to delete 😭" });
    }
    return res.status(200).send(deletedClass);
}