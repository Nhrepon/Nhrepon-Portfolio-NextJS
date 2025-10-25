import {NextRequest, NextResponse} from "next/server";
import QuestionModel from "@/models/neuron/questionModel";

export async function POST(req:NextRequest){
    try {
        const reqBody = req.json();
        const data = await QuestionModel.create(reqBody);
        return NextResponse.json({status:"success", message:"Question created successfully",data:data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}