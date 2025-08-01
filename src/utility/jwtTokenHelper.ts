import Jwt from "jsonwebtoken";
const jwtKey = "1234"

export const encodeToken=(userId: any, email: string, name: string)=>{
    const payload={userId: userId, email:email, name:name};
    //const payload={exp:Math.floor(Date.now()/1000)+(60*60*72),data:{email:email, userId:userId}};

    return Jwt.sign(payload, jwtKey, {expiresIn:"72h"});
}



export const decodeToken=(token: string)=>{
    try {
        console.log("Decode token: "+ JSON.stringify(Jwt.verify(token, jwtKey)));
        return Jwt.verify(token, jwtKey);
        
    } catch (error) {
        return error;
    }
}