
import TagModel from "@/models/tagModel";
import { NextRequest, NextResponse } from "next/server";
import {connectDatabase} from '@/db/dbConfig';

await connectDatabase();

export async function GET(request: NextRequest){
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const id = request.nextUrl.searchParams.get("id");
    try {
        if(id){
            const tag = await TagModel.findById(id);
            return NextResponse.json({status:"success", message:"Single tag fetched successfully", data:tag});
        }else{
        const tags = await TagModel.aggregate([
            {
                $sort: { updatedAt: -1 }
            },
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
        return NextResponse.json({status:"success", message:"Tags fetched successfully",total:tags[0].totalCount[0].total, loaded:tags[0].data.length, data:tags[0].data});
        }
    }catch (e:any) {
        return NextResponse.json({status:"error", message:"Tags fetched failed", error:e.message}, {status: 500});
    }
}



export async function POST(request: NextRequest){
    const {name, slug, description, image} = await request.json();
    try {
        const tagCheck = await TagModel.findOne({name});
        if(tagCheck){
            return NextResponse.json({status:"duplicate", message:"Tag already exists", error:"Tag already exists"}, {status: 400});
        }
        const slugCheck = await TagModel.findOne({slug});
        if(slugCheck){
            return NextResponse.json({status:"duplicate", message:"Slug already exists", error:"Slug already exists"}, {status: 400});
        }
        const tag = await TagModel.create({name, slug, description, image});
        return NextResponse.json({status:"success", message:"Tag created successfully", data:tag}, {status: 201});
    } catch (e:any) {
        return NextResponse.json({status:"error", message:"Tag created failed", error:e.message}, {status: 500});
    }
}

export async function PUT(request: NextRequest){
    const {_id, name, slug, description, image} = await request.json();
    try {
        const tagCheck = await TagModel.findOne({name, _id: {$ne: _id}});
        if(tagCheck){

            return NextResponse.json({status:"duplicate", message:"Tag already exists", error:"Tag already exists"}, {status: 400});
        }
        const slugCheck = await TagModel.findOne({slug, _id: {$ne: _id}});
        if(slugCheck){
            return NextResponse.json({status:"duplicate", message:"Slug already exists", error:"Slug already exists"}, {status: 400});
        }
    const tag = await TagModel.findByIdAndUpdate(_id, {name, slug, description, image});
    return NextResponse.json({status:"success", message:"Tag updated successfully", data:tag});
    } catch (e:any) {
        return NextResponse.json({status:"error", message:"Tag updated failed", error:e.message}, {status: 500});
    }
}

export async function DELETE(request: NextRequest){
    const {id} = await request.json();
    const tag = await TagModel.findByIdAndDelete(id);
    return NextResponse.json({status:"success", message:"Tag deleted successfully", data:tag});
}
