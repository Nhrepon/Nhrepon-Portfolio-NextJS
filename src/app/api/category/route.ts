import { connect } from "@/db/dbConfig";
import CategoryModel from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const categories = await CategoryModel.find();
        return NextResponse.json(categories);
    }catch (e:any) {
        NextResponse.json(
            {error: e.message},
            {status: 500}
        );
    }
}

export async function POST(request: NextRequest){
    const {name, slug, description, image} = await request.json();
    const category = await CategoryModel.create({name, slug, description, image});
    return NextResponse.json({status:"success", message:"Category created successfully", success:true, data:category});
}

