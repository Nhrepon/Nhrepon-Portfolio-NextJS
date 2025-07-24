
import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({status:"success", message:"Logout successfull", success:true});
        response.cookies.set("token", "", {httpOnly:true, expires: new Date(0)});
        response.cookies.set("userData", "", {httpOnly:true});
        return response;

    } catch (error:any) {
        return NextResponse.json({
            status: "failed",
            statusCode: 500, 
            error: error.message
        });
    }
}