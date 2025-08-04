import SkillModel from "@/models/skillModel";
import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/db/dbConfig";
import mongoose from "mongoose";

await connect();

export async function POST(request: NextRequest){
    const {title, description, image} = await request.json();
    const skill = await SkillModel.create({title, description, image});
    return NextResponse.json(skill);
}

export async function GET(request: NextRequest){
    try {
        const id = request.nextUrl.searchParams.get("id");
        const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;

        if(id){
            const skill = await SkillModel.findById(id);
            return NextResponse.json(skill);
        }

        const skills = await SkillModel.find().skip(skip).limit(limit);
        const total = await SkillModel.countDocuments();
        return NextResponse.json({status:"success", message:"Skills fetched successfully",total:total, loaded:skills.length, data:skills});
    }catch (e:any) {
        NextResponse.json(
            {error: e.message},
            {status: 500}
        );
    }
}

export async function PUT(request: NextRequest){
    const {_id, title, description, image} = await request.json();
    const skill = await SkillModel.findByIdAndUpdate(_id, {title, description, image});
    return NextResponse.json(skill);
}

export async function DELETE(request: NextRequest){
    const {id} = await request.json();
    const skill = await SkillModel.findByIdAndDelete(id);
    return NextResponse.json(skill);
}
