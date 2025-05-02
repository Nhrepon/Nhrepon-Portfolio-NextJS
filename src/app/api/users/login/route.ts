import UserModel from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptJs from 'bcryptjs';
import {sendEmail} from '@/utility/mailHelper';
import { connect } from '@/db/dbConfig';
import Jwt from 'jsonwebtoken';
import { encodeToken } from '@/utility/jwtTokenHelper';


connect();

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
        const tokenData = {
            
        }
        
        const token = await encodeToken(user._id, user.email,  user.userName);
        const response = NextResponse.json({message:"Logedin success", success:true});
        response.cookies.set("token", token, {httpOnly:true});
        return response;

    } catch (error) {
        return NextResponse.json({
            statusCode: 500, 
            error: error.message
        });
    }
}