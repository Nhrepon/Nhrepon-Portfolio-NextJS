
import {NextRequest, NextResponse} from 'next/server';
import { decodeToken } from '@/utility/jwtTokenHelper';
import UserModel from '@/models/userModel';
import { connect } from '@/db/dbConfig';

await connect();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        let {email, userId}:any = await decodeToken(token);
        const user = await UserModel.findOne({email: email}).select("-password");

        return NextResponse.json({status: "success", data: user});
    } catch (error:any) {
        return NextResponse.json({
            statusCode: 500,
            error: error.message
        });
    }
}