import UserModel from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptJs from 'bcryptjs';
import {sendEmail} from '@/utility/mailHelper';
import { connect } from '@/db/dbConfig';
import Jwt from 'jsonwebtoken';


connect();

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({message:"Logout successfull", success:true});
        response.cookies.set("token", "", {httpOnly:true, expires: new Date(0)});
        return response;

    } catch (error) {
        return NextResponse.json({
            statusCode: 500, 
            error: error.message
        });
    }
}