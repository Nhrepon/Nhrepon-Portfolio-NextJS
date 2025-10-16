import {NextRequest, NextResponse} from "next/server";
import QuestionModel from "@/models/neuron/Question-Model";

export async function POST(req:NextRequest){
    const reqBody = req.json();
    const data = await QuestionModel.create(reqBody);
    return NextResponse.json({status:"success", message:"Question created successfully",data:data});
}