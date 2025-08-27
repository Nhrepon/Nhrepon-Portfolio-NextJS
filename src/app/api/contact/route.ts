import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import ContactModel from "@/models/contactModel";


export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const data = await ContactModel.find();
        return NextResponse.json({status:"success", message:"All messages fetched successfully", data:data});
    } catch (error:any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const {name, email, subject, message} = await request.json();
        const userId = JSON.parse((await cookies()).get("userData")?.value || "").id;
        if(userId != null){
            const response = await ContactModel.create({name, email, subject, message, userId});
            return NextResponse.json({status:"success", message:"Message sent successfully", data:response});
        }else{
            const response = await ContactModel.create({name, email, subject, message});
            return NextResponse.json({status:"success", message:"Message sent successfully", data:response});
        }            
    } catch (error:any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}


