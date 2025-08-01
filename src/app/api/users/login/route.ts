import UserModel from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptJs from 'bcryptjs';
import { connect } from '@/db/dbConfig';
import { encodeToken } from '@/utility/jwtTokenHelper';



await connect();

interface loginReqBody {
    email: string;
    password: string
}
interface userDataInterface{
    _id: string;
    userName: string;
    email: string;
    password: string;
    bio?: string;
    image?: string;
    userRole: string;
    isVerified: boolean
}
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json() as loginReqBody;
        const {email, password} = reqBody;
        const user = await UserModel.findOne({ email: email }) as userDataInterface;
        if(!user){
            return NextResponse.json({status: "failed", statusCode: 400, message: "User not found"});
        }
        const validPassword = await bcryptJs.compare(password, user.password );
        if(!validPassword){
            return NextResponse.json({status: "failed", statusCode: 400, message: "Password didn't matched"});
        }
        
        const token = encodeToken(user._id, user.email,  user.userName);
        const userData = { id:user._id, userName:user.userName, email:user.email, userRole:user.userRole, isVerified:user.isVerified };
        const response = NextResponse.json({status:"success", message:"Logedin success", success:true, data:userData});
        response.cookies.set("userData", JSON.stringify(userData));
        response.cookies.set("token", token, {httpOnly:true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)});
        return response;

    } catch (error: any) {
        return NextResponse.json({
            statusCode: 500, 
            error: error.message
        });
    }
}