import { connect } from "@/db/dbConfig";
import TagModel from "@/models/tagModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const tags = await TagModel.find();
        return NextResponse.json(tags);
    }catch (e:any) {
        NextResponse.json(
            {error: e.message},
            {status: 500}
        );
    }
}

export async function POST(request: NextRequest){
    const {name, slug, description, image} = await request.json();
    const tag = await TagModel.create({name, slug, description, image});
    return NextResponse.json({status:"success", message:"Tag created successfully", data:tag});
}