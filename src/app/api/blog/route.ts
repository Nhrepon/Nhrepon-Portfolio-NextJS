import { connect } from "@/db/dbConfig";
import BlogModel from "@/models/blogModel";
import BlogMetaModel from "@/models/blogMetaModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function GET(request: NextRequest){
    try {
        const id = request.nextUrl.searchParams.get("id");

        if(id){
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return NextResponse.json(
                    { error: "Invalid blog ID format" },
                    { status: 400 }
                );
            }
            const blog = await BlogModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $lookup: {
                        from: "tags",
                        localField: "tagId",
                        foreignField: "_id",
                        as: "tag"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                }
            ]);
            return NextResponse.json({status:"success", message:"Blog details fetched successfully", data:blog});
        }

        const blogs = await BlogModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tagId",
                    foreignField: "_id",
                    as: "tag"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            }
        ]);

        return NextResponse.json({status:"success", message:"Blogs fetched successfully", data:blogs});
    }catch (e:any) {
        NextResponse.json(
            {error: e.message},
            {status: 500}
        );
    }
}

export async function POST(request: NextRequest){
try {
    const {title, content, slug, categoryId, tagId, image, status} = await request.json();

    const authorId = "6814cf4fdd4a923742fffe09";

    const blog = await BlogModel.create({title, content, slug, categoryId, tagId, image, authorId, status});

    let blogMeta;

    if(blog){
        blogMeta = await BlogMetaModel.create({blogId: blog._id, views: 0, likes: 0});
    }

    return NextResponse.json({status:"success", message:"Blog created successfully", data:blog, meta:blogMeta});
} catch (error:any) {
    return NextResponse.json({status:"error", message:"Blog created failed", error:error.message});
}
}




export async function DELETE(request: NextRequest){
    const {id} = await request.json();
    const blog = await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({status:"success", message:"Blog deleted successfully", data:blog});
}

export async function PUT(request: NextRequest){
    const {_id, title, content, slug, categoryId, tagId, image, authorId, views, likes, comments, status} = await request.json();
    const blog = await BlogModel.findByIdAndUpdate(_id, {title, content, slug, categoryId, tagId, image, authorId, views, likes, comments, status}); 
    return NextResponse.json({status:"success", message:"Blog updated successfully", data:blog});
}

