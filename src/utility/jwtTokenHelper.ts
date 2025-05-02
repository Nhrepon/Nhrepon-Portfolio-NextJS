import Jwt from "jsonwebtoken";
const jwtKey = "1234"

export const encodeToken=(userId, email, name)=>{
    const payload={userId: userId, email:email, name:name};
    //const payload={exp:Math.floor(Date.now()/1000)+(60*60*72),data:{email:email, userId:userId}};

    return Jwt.sign(payload, jwtKey, {expiresIn:"72h"});
}



export const decodeToken=(token)=>{
    try {
        console.log(Jwt.verify(token, jwtKey));
        return Jwt.verify(token, jwtKey);
        
    } catch (error) {
        return error;
    }
}