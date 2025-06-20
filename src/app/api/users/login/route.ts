import UserModel from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptJs from 'bcryptjs';
import { connect } from '@/db/dbConfig';
import { encodeToken } from '@/utility/jwtTokenHelper';



await connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await UserModel.findOne({ email: email });
        if(!user){
            return NextResponse.json({status: "failed", statusCode: 400, message: "User not found"});
        }
        const validPassword = await bcryptJs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({status: "failed", statusCode: 400, message: "Password didn't matched"});
        }
        
        const token = encodeToken(user._id, user.email,  user.userName);
        const userData = { _id:user._id, userName:user.userName, email:user.email, userRole:user.userRole, isVerified:user.isVerified };
        const response = NextResponse.json({status:"success", message:"Logedin success", success:true, data:userData});
        response.cookies.set("token", token, {httpOnly:true});
        return response;

    } catch (error: any) {
        return NextResponse.json({
            statusCode: 500, 
            error: error.message
        });
    }
}