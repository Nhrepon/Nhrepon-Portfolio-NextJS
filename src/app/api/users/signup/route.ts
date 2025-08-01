import UserModel from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptJs from 'bcryptjs';
import {sendEmail} from '@/utility/mailHelper';
import { connect } from '@/db/dbConfig';

await connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {userName, email, password} = reqBody

        // Check if any required field is missing or empty
        if (!userName) {
            return NextResponse.json({
                status: "error",
                statusCode: 400,
                message: "Username is required"
            });
        }else if(!email) {
            return NextResponse.json({
                status: "error",
                statusCode: 400,
                message: "Email is required"
            });
        }else if(!password) {
            return NextResponse.json({
                status: "error",
                statusCode: 400,
                message: "Password is required"
            });
        }

        const user = await UserModel.findOne({ email: email });
        if(user){
            return NextResponse.json({status: "duplicate", statusCode: 400, message: "Email already registered"});
        }

        const salt = await bcryptJs.genSalt(10);
        const hashPassword = await bcryptJs.hash(password, salt);
        
        console.log('Generated hash password:', hashPassword);

        const newUser = new UserModel({
            userName,
            email,
            password: hashPassword,
            bio: "",
            image: "",
            otp: "0",
            otpExpire: new Date()
        });

        const saveUser = await newUser.save();
        console.log('Saved user:', saveUser);
        
        await sendEmail(email, "Success mail", "User created successfully");
        return NextResponse.json({
            status: "success", 
            message: "User registration success", 
            data: {
                name: userName, 
                email: email
            }
        });

    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json({
            statusCode: 500, 
            error: error.message
        });
    }
}