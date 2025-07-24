import { connect } from "@/db/dbConfig";
import BlogModel from "@/models/blogModel";
import BlogMetaModel from "@/models/blogMetaModel";
import { NextRequest, NextResponse } from "next/server";


await connect();

export async function GET(request: NextRequest){
    try {
        const slug = request.nextUrl.searchParams.get("slug");
        const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;

        if(slug){
            const blog = await BlogModel.aggregate([
                {
                    $match: {
                        slug: slug
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
                },
                {
                    $lookup: {
                        from: "blogmetas",
                        localField: "_id",
                        foreignField: "blogId",
                        as: "meta"
                    }
                },
                {
                    $lookup: {
                        from: "comments",
                        let: { blogId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$blogId", "$$blogId"] } } },
                            { $count: "count" }
                        ],
                        as: "commentsCount"
                    }
                },
                {
                    $unwind: {
                        path: "$commentsCount",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $addFields: {
                        commentsCount: { $ifNull: ["$commentsCount.count", 0] }
                    }
                },
                {
                    $unwind: "$meta"
                },
                
            ]);
            const view = await BlogMetaModel.findOneAndUpdate({blogId: blog[0]._id}, { $inc: { views: 1 } });
            return NextResponse.json({status:"success", message:"Blog details fetched successfully", data:blog[0], meta:view[0]});
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
            },
            {
                $lookup: {
                    from: "blogmetas",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "meta"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    let: { blogId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$blogId", "$$blogId"] } } },
                        { $count: "count" }
                    ],
                    as: "commentsCount"
                }
            },
            {
                $unwind: {
                    path: "$commentsCount",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    commentsCount: { $ifNull: ["$commentsCount.count", 0] }
                }
            },
            {
                $unwind: "$meta"
            },
            {
                $sort: { updatedAt: -1 }
            },
            {
                $facet: {
                    totalCount: [ { $count: "totalCount" } ],
                    data: [ { $skip: skip }, { $limit: limit } ]
                }
            },
        ]);

        return NextResponse.json({status:"success", message:"Blogs fetched successfully", total:blogs[0].totalCount[0].totalCount || 0, loaded:blogs[0].data.length, data:blogs[0].data});
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
    const blogMeta = await BlogMetaModel.findOneAndDelete({blogId: id});
    return NextResponse.json({status:"success", message:"Blog deleted successfully", data:blog, meta:blogMeta});
}

export async function PUT(request: NextRequest){
    const {_id, title, content, slug, categoryId, tagId, image, authorId, views, likes, comments, status} = await request.json();
    const blog = await BlogModel.findByIdAndUpdate(_id, {title, content, slug, categoryId, tagId, image, authorId, views, likes, comments, status}); 
    return NextResponse.json({status:"success", message:"Blog updated successfully", data:blog});
}
