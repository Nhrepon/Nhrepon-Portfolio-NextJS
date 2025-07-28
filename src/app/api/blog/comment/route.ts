import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import CommentModel from "@/models/commentModel";
import mongoose from "mongoose";

connect();

export async function POST(request: NextRequest) {
    try {
        const { blogId, name, email, comment } = await request.json();
        const userId = JSON.parse(request.cookies.get("userData")?.value || "").id;
        if(userId != null){
            const response = await CommentModel.create({blogId, userId, name, email, comment});
            return NextResponse.json({status:"success", message:"Comment added successfully", data:response});
        }else{
            const response = await CommentModel.create({blogId, name, email, comment});
            return NextResponse.json({status:"success", message:"Comment added successfully", data:response});
        }            
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const blogId = request.nextUrl.searchParams.get("blogId")!;
        const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
        const data = await CommentModel.aggregate([
            { $match: { blogId: new mongoose.Types.ObjectId(blogId) } },
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
            { $unwind: "$user" },
            { $sort: { updatedAt: -1 } },

            {
                $project: {
                    totalCount: 1,
                    data: 1,
                    name: 1,
                    email: 1,
                    comment: 1,
                    blogId: 1,
                    userId: 1,
                    updatedAt: 1,
                    createdAt: 1,
                    userName: "$user.userName"
                }
            },
            { $facet: {
                totalCount: [ { $count: "totalCount" } ],
                data: [ { $skip: skip }, { $limit: limit } ]
            } },
        ]);
        return NextResponse.json({status:"success", message:"Comment list", total:data[0].totalCount[0].totalCount || 0, loaded:data[0].data.length, data:data[0].data});
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
