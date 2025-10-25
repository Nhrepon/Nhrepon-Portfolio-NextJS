import {NextRequest, NextResponse} from "next/server";
import {connectDatabase} from "@/db/dbConfig";
import ExamModel from "@/models/neuron/examModel";

await connectDatabase();

export async function GET(request: NextRequest) {
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const id = request.nextUrl.searchParams.get("id");
    try {
        if(id){
            const data = await ExamModel.findById(id);
            return NextResponse.json({status:"success", message:"Exam fetched successfully", data});
        }else{
            const data = await ExamModel.aggregate([
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
            return NextResponse.json({status:"success", message:"Exams fetched successfully",total:data[0].totalCount[0].total, loaded:data[0].data.length, data:data[0].data});
        }
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const data = await ExamModel.create(reqBody);
        return NextResponse.json({status:"success", message:"Exam created successfully",data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}


export async function PUT(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const reqBody = await request.json();
        const data = await ExamModel.findByIdAndUpdate(id, reqBody);
        return NextResponse.json({status:"success", message:"Exam updated successfully",data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const data = await ExamModel.findByIdAndDelete(id);
        return NextResponse.json({status:"success", message:"Exam deleted successfully",data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}