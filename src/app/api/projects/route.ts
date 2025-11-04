
import {NextRequest, NextResponse} from "next/server";
import ProjectModel from "@/models/projectModel";
import {cookies} from "next/headers";
import mongoose from "mongoose";
import {connectDatabase} from '@/db/dbConfig';

await connectDatabase();

export async function GET(request: NextRequest) {
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const id = request.nextUrl.searchParams.get("id");
    //const slug = request.nextUrl.pathname.split("/")[2];
    console.log("slug is: ",request.nextUrl.pathname);
    try {
        if(id){
            const project = await ProjectModel.findById(id);
            return NextResponse.json({status:"success", message:"Project fetched successfully", data:project});
        }
        // else if(slug){
        //     const project = await ProjectModel.findOne({slug:slug});
        //     return NextResponse.json({status:"success", message:"Project fetched successfully", data:project});
        // }
        else{
            const projects = await ProjectModel.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
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
                        from: "tags",
                        localField: "technologies",
                        foreignField: "_id",
                        as: "technology",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    name: 1,
                                    slug: 1,
                                    image: 1,
                                    description: 1
                                }
                            }
                        ],
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categories",
                        foreignField: "_id",
                        as: "category",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    name: 1,
                                    slug: 1,
                                    image: 1,
                                    description: 1
                                }
                            }
                        ],
                    }
                },
                {
                    $lookup: {
                        from: "skills",
                        localField: "skills",
                        foreignField: "_id",
                        as: "skill",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    title: 1,
                                    slug: 1,
                                    image: 1,
                                    description: 1
                                }
                            }
                        ],
                    }
                },
                {
                    $sort: {updatedAt: -1}
                },
                {
                    $facet: {
                        totalCount: [{$count: "total"}],
                        data: [ { $skip: skip }, { $limit: limit } ]
                    }
                }
            ]);
            return NextResponse.json({
                status: "success",
                message: "Projects fetched successfully",
                total: projects[0].totalCount[0].total,
                loaded: projects[0].data.length,
                data: projects[0].data
            });
        }
    } catch (e:any) {
        return NextResponse.json({
            status: "error",
            message: e.message
        });
    }
}



export async function POST(request: NextRequest) {
    const {title,slug, description, image, technologies, categories, skills, liveLink, projectLink, startDate, endDate, status} = await request.json();
    const userId = JSON.parse((await cookies()).get("userData")?.value || "").id;
    try {

        const techIds = technologies.map((id: string) => new mongoose.Types.ObjectId(id));
        const catIds = categories.map((id: string) => new mongoose.Types.ObjectId(id));
        const skillIds = skills.map((id: string) => new mongoose.Types.ObjectId(id));

        const project = await ProjectModel.create({title,slug, description, image, technologies: techIds, categories: catIds, skills: skillIds, liveLink, projectLink, startDate, endDate, status, userId: [userId]});
        return NextResponse.json({
            status: "success",
            message: "Project created successfully",
            data: project
        });
    }catch (e:any) {
        return NextResponse.json({
            status: "error",
            message: e.message
        });
    }
}


export async function PUT(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")!;
    const {title,slug, description, image, technologies, categories, skills, liveLink, projectLink, startDate, endDate, status} = await request.json();
    try {

        const techIds = technologies.map((id: string) => new mongoose.Types.ObjectId(id));
        const catIds = categories.map((id: string) => new mongoose.Types.ObjectId(id));
        const skillIds = skills.map((id: string) => new mongoose.Types.ObjectId(id));

        const project = await ProjectModel.findByIdAndUpdate(id, {title,slug, description, image, technologies: techIds, categories: catIds, skills: skillIds, liveLink, projectLink, startDate, endDate, status}, {new: true});
        return NextResponse.json({
            status: "success",
            message: "Project updated successfully",
            data: project
        });
    }catch (e:any) {
        return NextResponse.json({
            status: "error",
            message: e.message
        });
    }
}


export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")!;
    try {
        const project = await ProjectModel.findByIdAndDelete(id);
        return NextResponse.json({
            status: "success",
            message: "Project deleted successfully",
        });
    }catch (e:any) {
        return NextResponse.json({
            status: "error",
            message: e.message
        });
    }
}

