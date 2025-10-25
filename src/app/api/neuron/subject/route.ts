import {NextRequest, NextResponse} from "next/server";
import SubjectModel from "@/models/neuron/subjectModel";
import {connectDatabase} from "@/db/dbConfig";

await connectDatabase();

export async function GET(request: NextRequest) {
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const id = request.nextUrl.searchParams.get("id");
    try {
        if(id){
            const data = await SubjectModel.findById(id);
            return NextResponse.json({status:"success", message:"Subject fetched successfully", data});
        }else{
            const data = await SubjectModel.aggregate([
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
                    },
                }
            ]);
            return NextResponse.json({status:"success", message:"Subjects fetched successfully",total:data[0].totalCount[0].total, loaded:data[0].data.length, data:data[0].data});
        }
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const data = await SubjectModel.create(reqBody);
        return NextResponse.json({status:"success", message:"Subject created successfully",data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}


export async function PUT(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const reqBody = await request.json();
        const data = await SubjectModel.findByIdAndUpdate(id, reqBody);
        return NextResponse.json({status:"success", message:"Subject updated successfully",data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const data = await SubjectModel.findByIdAndDelete(id);
        return NextResponse.json({status:"success", message:"Subject deleted successfully",data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}