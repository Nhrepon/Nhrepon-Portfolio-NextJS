import { connect } from "@/db/dbConfig";
import CategoryModel from "@/models/categoryModel";
import { generateSlug } from "@/utility/Utility";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    try {
        const categories = await CategoryModel.aggregate([
            {
                $facet: {
                    totalCount: [ { $count: "total" } ],
                    data: [
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        }
                    ]
                }
            }
        ]);
        return NextResponse.json({status:"success", message:"Categories fetched successfully",total:categories[0].totalCount[0].total, loaded:categories[0].data.length, data:categories[0].data});
    }catch (e:any) {
        return NextResponse.json(
            {error: e.message},
            {status: 500}
        );
    }
}




export async function POST(request: NextRequest){
    let {name, slug, description, image} = await request.json();
    try {
        const categoryCheck = await CategoryModel.findOne({name});
        if(categoryCheck){
            return NextResponse.json({status:"duplicate", message:"Category already exists", error:"Category already exists"}, {status: 400});
        }
        const slugCheck = await CategoryModel.findOne({slug});
        if(slugCheck){
            return NextResponse.json({status:"duplicate", message:"Slug already exists", error:"Slug already exists"}, {status: 400});
        }

        slug = generateSlug(slug);

        const category = await CategoryModel.create({name, slug, description, image});
        return NextResponse.json({status:"success", message:"Category created successfully", data:category});
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}

export async function PUT(request: NextRequest){
    const {name, slug, description, image} = await request.json();
    const category = await CategoryModel.findByIdAndUpdate({name, slug, description, image});
    return NextResponse.json({status:"success", message:"Category updated successfully", data:category});
}

export async function DELETE(request: NextRequest){
    const {id} = await request.json();
    const category = await CategoryModel.findByIdAndDelete(id);
    return NextResponse.json({status:"success", message:"Category deleted successfully", data:category});
}
