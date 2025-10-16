import QuestionModel from "@/models/neuron/Question-Model";
import {NextResponse} from "next/server";

export async function GET(){
    try {
        const data = await QuestionModel.find({});
        return NextResponse.json({status:"success", message:"Category fetched successfully", data});
    }catch (e:any) {
        return NextResponse.json({status:"error", message:e.message, data:e});
    }
}