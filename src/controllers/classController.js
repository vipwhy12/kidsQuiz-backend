import Class from "../models/LiveClasses.js"
import User from "../models/Users.js"
import Puzzle from "../models/Puzzles.js"
import {getUserId} from "../middlewares.js"
import Material from "../models/Materials.js"
import MultipleChoice from "../models/MultipleChoice.js"

export const postImage = (req,res) => {
    const {file} = req.body
    console.log("file~~" ,file);
    res.send("OK")
}

//!!!!! 새로 추가 
export const getClassHost = async(req,res) => {
    let result ;
    const { room } = req.query; // class ObjectId
    const id = await getUserId(req.loggedInUser);
    const user = await User.findOne(id);
    //room의 user 값이 id와 동일하지 확인 
    const classFound = await Class.findById(room);
    console.log("나와라!", classFound)
    if (classFound == "" || classFound == null) {
        return res.status(401).json({ message:"Can't found the Class 😢" });
    }
    if (classFound.user.toString() != id) {
        result  = false
    }
    else {
        result = true
    }
    const data = {
        'result' :result, 
        'name' : user.name
    }
    console.log("📄 호스트인가?  ", data)
    return res.status(200).json(data);
}

export const getClassList = async(req, res) => {
    console.log("getClassList 호출 🧤 ")
    const id = await getUserId(req.loggedInUser);
    const user = await User.findOne(id);
    if (!user){
        return res.status(401).json({ message:"There's no such User 😢" });
    } 
    let today = new Date();   
    console.log("현재 시간: ⏰",today);
    const classes = await Class.find({user:id, startDateTime: { $gte: today } })
    console.log(classes)


    return res.status(200).json(classes)
}

export const getClass = async(req, res) => {
    console.log("getClass 호출 🧤 ")
    const { id } = req.params; //id는 클래스 id 
    const user = await getUserId(req.loggedInUser);
    const classFound = await Class.findById(id);
    const classMaterialId = classFound.classMaterial;
    console.log("classFound는", classFound)

    if (classFound == "" || classFound == null) {
        return res.status(401).json({ message:"Can't found the Class 😢" });
    }
    // if (classFound.user != user) {
    //     return res.status(401).json({ message:"You have no right to see the classinfo 😤 " });
    // }
    if (classFound.user.toString() != user.toString()) {
        return res.status(401).json({ message:"You have no right to update the class 😤 " });
    }
    return res.status(200).json(classFound);
}

export const postNewClass = async(req,res) => {
    console.log("getPostNewClass 호출 🧤 ")
    console.log()
    let thumbnail ; 
    if (req.file == undefined ) {
        thumbnail = "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/upload/defaultThumbnail.jpeg"
    }
    else {
        const file = req.file
        thumbnail = file.location
    }
    console.log("로그인된 유저 나와라📌📌📌 ", req.loggedInUser);
    const user = await getUserId(req.loggedInUser);

    
    const {title, startDateTime, studentMaxNum, classKey} = req.body;
    let {classMaterial} = req.body;
    
    if (!title || startDateTime == null || startDateTime == undefined  || studentMaxNum<=0 ) {
        return res.status(400).json({ message:"There's missing information 😭", title, startDateTime, studentMaxNum, thumbnail });
    }

    // 이 유저가 생성한 클래스 중 겹치는 시간이 있는지 확인 
    const sameDateTime = await Class.findOne({startDateTime, user})
    console.log("테스트")

    if (sameDateTime) {
        return res.status(401).json({ message:"You already have the class in the same date and time 😭" });
    }
    console.log("클래스 생성 시작",     console.log("getClassMaterial이 실행됩니다!"));
    console.log("클래스 생성 시작", classMaterial === "null");
    try{
 
        
        if (classMaterial == 'null') {
            console.log("교구 없음")
            await Class.create({
                title, 
                startDateTime, 
                studentMaxNum, 
                classKey, 
                thumbnail, 
                user
            });
        }
        else {
        await Class.create({
            title, 
            startDateTime, 
            studentMaxNum, 
            classKey, 
            classMaterial ,
            thumbnail, 
            user
        });
    }
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
    const {title, startDateTime, studentMaxNum, classKey, classMaterial} = req.body;
    console.log("로그인된 유저 나와라📌📌📌 ", req.loggedInUser);
    const user = await getUserId(req.loggedInUser);
    const classFound = await Class.findById(_id)
    console.log("🧲",classFound._id)
    console.log("🧲",classFound.user)
    console.log("🧲", user)
    console.log(classFound.user.toString() == user.toString())

    if (classFound.user.toString() != user.toString()) {
        return res.status(401).json({ message:"You have no right to update the class 😤 " });
    }
    
    let thumbnail; 
        if (req.file != undefined ) { // 사진이 들어온 경우 -> 수정해야 해 
            const file = req.file
            console.log("뽑아보자",file.location);
            thumbnail = file.location
        } else {
            thumbnail = classFound.thumbnail // 새 사진이 안 들어온 경우 -> 수정할 필요 없이 기존의 thumbnail 값 그대로 사용 
            //todo:  가능하다면 s3에서 기존 사진을 삭제하는 로직이 추가되면 좋게따.. 
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
    // if (classFound._id != user) {
    //     return res.status(401).json({ message:"You have no right to delete the class 😤 " });
    // }
    if (classFound.user.toString() != user.toString()) {
        return res.status(401).json({ message:"You have no right to update the class 😤 " });
    }

    const deletedClass = await Class.findByIdAndDelete(id);
    console.log("deletedClass는 ", deletedClass);
    if (!deletedClass) {
        return res.status(401).json({ message:"Found no class to delete 😭" });
    }
    return res.status(200).send(deletedClass);
}



//라이브 페이지 입장시, Material 가져오기
export const getClassMaterial  = async(req,res) =>{
    console.log("getClassMaterial이 실행됩니다!")
    const { id } = req.params; //id : 클래스 식별자 
    const user = await getUserId(req.loggedInUser);
    
    try {
        const classFound = await Class.findById(id.toString());  
        const classObjectId = classFound.classMaterial.toString();        
        const classMaterial = await Material.findById(classObjectId)
        // console.log(classMaterial)
        //교구 묶음이 잘 뽑아져 나왔으면 해당 교구재들을 다시 담아서 보내주자 

        if(){
                        
        }
        let imageList = classMaterial.image
        let puzzleList = classMaterial.puzzle
        let multipleChoiceList = classMaterial.multipleChoice

        let liveImageList = []
        let livePuzzleList = []
        let liveMultipleChoiceList = []
        
        
        for(let i = 0; i < imageList.length ;i++){
            liveImageList[i] = await Image.findById(imageList[i].toString)
        }


        for(let i = 0; i < puzzleList.length ;i++){
            livePuzzleList[i] = await Puzzle.findById(puzzleList[i])
        }

        
        for(let i = 0; i < MultipleChoice.length; i++){
            liveMultipleChoiceList[i] = await MultipleChoice.findById(multipleChoiceList[i])
        }

        console.log("getClassMaterial search 완료!")        
        return res.status(200).json({ puzzle : livePuzzleList , multipleChoice : liveMultipleChoiceList, image : liveImageList});
    }catch(err){
        console.log("에러메세지 :" + err)
        return res.status(404).json({message : err})
    }
}