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

        if(id){
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return NextResponse.json(
                    { error: "Invalid skill ID format" },
                    { status: 400 }
                );
            }
            const skill = await SkillModel.findById(id);
            return NextResponse.json(skill);
        }

        const skills = await SkillModel.find();
        return NextResponse.json(skills);
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
