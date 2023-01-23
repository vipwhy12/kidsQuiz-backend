import Class from "../models/LiveClasses.js"
import User from "../models/Users.js"
import Puzzle from "../models/Puzzles.js"
import {getUserId} from "../middlewares.js"
import Material from "../models/Materials.js"
import MultipleChoice from "../models/MultipleChoice.js"
import Image from "../models/Images.js"


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
    
    const classes = await Class.
        find({user:id, startDateTime: { $gte: today }}).sort({startDateTime: 1})
        // .select('_id startDateTime title studentMaxNum classMaterial thumbnail user')

    console.log("classes", classes)
    
    // ⏰한국 시간으로 변환  
    classes.forEach(doc=> {
        let date = doc.startDateTime
        date.setHours(date.getHours()+9)
        doc.startDateTime= date
    })
    
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
    if (classFound.user != user) {
        return res.status(401).json({ message:"You have no right to see the classinfo 😤 " });
    }
    if (classFound.user.toString() != user.toString()) {
        return res.status(401).json({ message:"You have no right to update the class 😤 " });
    }
    return res.status(200).json(classFound);
}

export const postNewClass = async(req,res) => {
    console.log("getPostNewClass 호출 🧤 ")

    /* req.body 모습 (classMaterial,image 없이 보냈을 때. 이미지가 있는 경우에는 아예 image: ''조차도 없음  )
    {
        title: 'asdfasdf',
        startDateTime: '2023-01-21 00:00:00',
        classMaterial: 'null',
        studentMaxNum: '4',
        image: ''
        }
    */
    
    let thumbnail ; 
    if (req.file == undefined ) {
        const randomIndex = Math.floor((Math.random())*5)
        console.log(randomIndex)
        const thumnails = [
            "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB1.png",
            "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%A1%E1%84%80%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8F%E1%85%A2%E1%84%85%E1%85%B5%E1%86%A8%E1%84%90%E1%85%A52+2.png",
            "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%A1%E1%84%80%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8F%E1%85%A2%E1%84%85%E1%85%B5%E1%86%A8%E1%84%90%E1%85%A52+3.png",
            "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%A1%E1%84%80%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%8F%E1%85%A2%E1%84%85%E1%85%B5%E1%86%A8%E1%84%90%E1%85%A52.png",
            "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B1%E1%84%8B%E1%85%A7%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF%E1%84%80%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B74.png"
        ]
        thumbnail = thumnails[randomIndex]
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
    

    if (sameDateTime) {
        console.log("🚨 동일한 시간에 이미 강의가 존재합니다")
        return res.status(401).json({ message:"You already have the class in the same date and time 😭" });
    }

    console.log("클래스 생성 시작",     console.log("getClassMaterial이 실행됩니다!"));

    try{
        await Class.create({
            title, 
            startDateTime, 
            studentMaxNum,  
            classMaterial: classMaterial === 'null' ? null : classMaterial , 
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
    const {title, startDateTime, studentMaxNum, classMaterial} = req.body;
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
        const classFound =  await Class.findById(id);
        // console.log(classFound.classMaterial)
        // console.log(classFound.classMaterial === null)

        if(classFound.classMaterial === undefined || classFound.classMaterial === null){
            console.log("🙊관련 수업 자료가  없습니다.")
            return res.status(200).json({ message: "관련 수업 자료가 없습니다.." });
        }

        const liveClassMaterial = await Material.findById(classFound.classMaterial);
        
        if(liveClassMaterial === null || classFound.classMaterial === undefined){
            console.log("🙊수업 자료가 없습니다.")
            return res.status(200).message("🙊수업 자료가 없습니다.");
        }

        let imageList = liveClassMaterial.image
        let puzzleList = liveClassMaterial.puzzle
        let multipleChoiceList = liveClassMaterial.multipleChoice

        let liveImageList = []
        let livePuzzleList = []
        let liveMultipleChoiceList = []

        let imageMultipleChoiceList = []
        let textMultipleChoiceList = []

        console.log(multipleChoiceList)
        
        
        for(let i = 0; i < imageList.length ;i++){
            liveImageList[i] = await Image.findById(imageList[i])
        }


        for(let i = 0; i < puzzleList.length ;i++){
            livePuzzleList[i] = await Puzzle.findById(puzzleList[i])
        }

        
        for(let i = 0; i < multipleChoiceList.length; i++){
            liveMultipleChoiceList[i] = await MultipleChoice.findById(multipleChoiceList[i])
        }

        for(let i = 0; i < liveMultipleChoiceList.length; i++){
            // console.log(liveMultipleChoiceList[i].category)
            if (liveMultipleChoiceList[i].category == 1){
                textMultipleChoiceList.push(liveMultipleChoiceList[i])
            } else if (liveMultipleChoiceList[i].category == 2) {
                imageMultipleChoiceList.push(liveMultipleChoiceList[i])
            }
        }

        return res.status(200).json({ puzzle : livePuzzleList , textMultipleChoiceList:textMultipleChoiceList ,imageMultipleChoiceList :imageMultipleChoiceList ,image : liveImageList});
    
    }catch(err){
        console.log("에러메세지 :" + err)
        return res.status(404).json({message : err})
    }
}