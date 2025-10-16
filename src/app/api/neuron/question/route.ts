import QuestionModel from "@/models/neuron/Question-Model";
import {NextResponse} from "next/server";

export async function GET(){
    const data = await QuestionModel.find({});
    return NextResponse.json({status:"success", message:"Question fetched successfully", data});
}