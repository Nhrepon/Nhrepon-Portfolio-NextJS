import {connectDatabase} from "@/db/dbConfig";
import BlogModel from "@/models/blogModel";
import BlogMetaModel from "@/models/blogMetaModel";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

await connectDatabase()

export async function GET(request: NextRequest){
    try {
        const slug = request.nextUrl.searchParams.get("slug");
        const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 12;

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
                        as: "category",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    name: 1,
                                    slug: 1,
                                }
                            }
                        ],
                    }
                },
                {
                    $lookup: {
                        from: "tags",
                        localField: "tagId",
                        foreignField: "_id",
                        as: "tag",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    name: 1,
                                    slug: 1,
                                }
                            }
                        ],
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    userName: 1,
                                }
                            }
                        ],
                        
                    }
                },
                {
                    $lookup: {
                        from: "blogmetas",
                        localField: "_id",
                        foreignField: "blogId",
                        as: "meta",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    views: 1,
                                    likes: 1,
                                }
                            }
                        ],
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
                    as: "category",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                slug: 1,
                            }
                        }
                    ],
                }
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tagId",
                    foreignField: "_id",
                    as: "tag",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                slug: 1,
                            }
                        }
                    ],
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                userName: 1,
                            }
                        }
                    ],
                }
            },
            {
                $lookup: {
                    from: "blogmetas",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "meta",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                views: 1,
                                likes: 1,
                            }
                        }
                    ],
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
                $project: {
                    _id: 1,
                    title: 1,
                    slug: 1,
                    image: 1,
                    content: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    category: 1,
                    tag: 1,
                    author: 1,
                    meta: 1,
                    commentsCount: 1,
                }
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
            {status:"error", message:"Blogs fetched failed", error: e.message},
        );
    }
}

export async function POST(request: NextRequest){
try {
    const {title, content, slug, categoryId, tagId, image, status} = await request.json();

    const authorId = JSON.parse((await cookies()).get("userData")?.value || "").id;
    
    // Convert category IDs to MongoDB ObjectIds
    const categoryIds = Array.isArray(categoryId) 
      ? categoryId.map((id: string) => new mongoose.Types.ObjectId(id))
      : [];

    // Convert tag IDs to MongoDB ObjectIds
    const tagIds = Array.isArray(tagId) 
      ? tagId.map((id: string) => new mongoose.Types.ObjectId(id))
      : [];

    // Log for debugging
    console.log('Category IDs:', categoryIds.length, 'Tag IDs:', tagIds.length);
    console.log('Category IDs:', categoryIds);
    console.log('Tag IDs:', tagIds);

    // Validate required fields
    if (!title) {
      return NextResponse.json({
        status: "error",
        message: "Blog creation failed",
        error: "Title is required"
      });
    }
    if (!content) {
      return NextResponse.json({
        status: "error",
        message: "Blog creation failed",
        error: "Content is required"
      });
    }
    if (!slug) {
      return NextResponse.json({
        status: "error",
        message: "Blog creation failed",
        error: "Slug is required"
      });
    }
    if (!image) {
      return NextResponse.json({
        status: "error",
        message: "Blog creation failed",
        error: "Image is required"
      });
    }
    if (!authorId) {
      return NextResponse.json({
        status: "error",
        message: "Blog creation failed",
        error: "Author ID is required"
      });
    }
    if (categoryIds.length === 0) {
      return NextResponse.json({
        status: "error",
        message: "Blog creation failed",
        error: "At least one category is required"
      });
    }

    try {
      const blog = await BlogModel.create({
        title,
        content,
        slug,
        categoryId: categoryIds,
        tagId: tagIds,
        image,
        authorId,
        status
      });


      let blogMeta;

    if(blog){
        blogMeta = await BlogMetaModel.create({blogId: blog._id, views: 0, likes: 0});
    }

    return NextResponse.json({status:"success", message:"Blog created successfully", data:blog, meta:blogMeta});
     
    } catch (error: any) {
      console.error('Blog creation error:', error);
      return NextResponse.json({
        status: "error",
        message: "Blog creation failed",
        error: error.message
      });
    }
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
    const {id, title, content, slug, categoryId, tagId, image} = await request.json();
    const blog = await BlogModel.findByIdAndUpdate(id, {title, content, slug, categoryId, tagId, image}, {new: true}); 
    return NextResponse.json({status:"success", message:"Blog updated successfully", data:blog});
}
