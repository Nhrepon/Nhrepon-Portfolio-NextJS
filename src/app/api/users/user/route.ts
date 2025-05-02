
import {NextRequest, NextResponse} from 'next/server';
import { decodeToken } from '@/utility/jwtTokenHelper';
import UserModel from '@/models/userModel';
import { connect } from '@/db/dbConfig';

connect();

export async function POST(request: NextRequest) {
    try {
        const token = await request.cookies.get("token")?.value || "";
        const data = await decodeToken(token);
        const user = await UserModel.findOne({_id:data.userId}).select("-password");

        return NextResponse.json({status: "success", data: user});
    } catch (error) {
        return NextResponse.json({
            statusCode: 500, 
            error: error.message
        });
    }
}