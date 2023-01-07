import User from "../models/Users.js"


export const join = (req, res) => res.send("Join");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");


export const postLogin = async(req, res) => {
    const {email, password} = req.body;
    console.log(email, password); 
    const user = await User.findOne({email});  //email키의 값이 (변수)email 인 것 찾음 
    
    //비밀번호 일치하는지 확인 
    console.log(user);
    if (!user) {
      return res.status(401).json({ message:"No user with the information😢 " });
     }
    if (user.password !== password) {
    return res.status(401).json({ message:"Password does not match 😢" });
    }
    return res.json({ message: "Loggin!"})
}
  
export const postJoin = async(req, res) => {
    console.log(req.body);
    const {email, name, password, phoneNumber, child_one_name, child_one_birth,child_two_name, child_two_birth} = req.body;
    console.log(email, name, password, phoneNumber, child_one_name, child_one_birth,child_two_name, child_two_birth)

    //이메일이 존재하는지 확인 
    const existing = await User.exists({email});
    if (existing) {
        return res.status(401).json({ message:"User with the email address already exists" });
    }
    const children= [{
                    childName: child_one_birth,
                    childBirth: child_one_birth,
                  }, {
                    childName: child_two_birth,
                    childBirth: child_two_birth,
                }]
    console.log(children)
    try{
        console.log("회원생성 시작");
         await User.create({
            email, 
            name, 
            password, 
            phoneNumber, 
            childawaitren  
        });
        console.log("회원생성 완료");
        const joinedUser = await User.findOne({email})
        console.log("회원 가입된 유저는 : " ,joinedUser);
        return res.status(200).send(joinedUser);
    } catch(error) {
        return res.status(500).json({ message:"we faced a problem as creating user" });
    }
  }

 
 