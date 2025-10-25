import {NextRequest, NextResponse} from "next/server";
import {connectDatabase} from "@/db/dbConfig";
import QuestionModel from "@/models/neuron/questionModel";
import {cookies} from "next/headers";
import QuestionMetaModel from "@/models/neuron/questionMetaModel";

await connectDatabase();

export async function GET(request: NextRequest) {
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const id = request.nextUrl.searchParams.get("id");
    try {
        if(id){
            const data = await QuestionModel.findById(id);
            return NextResponse.json({status:"success", message:"Question fetched successfully", data});
        }else{
            const data = await QuestionModel.aggregate([
                {
                    $sort: { updatedAt: -1 }
                },
                {
                    $facet: {
                        totalCount: [ { $count: "total" } ],
                        data: [
                            {
                                $lookup:{
                                    from:"questionsMetas",
                                    localField:"questionId",
                                    foreignField:"_id",
                                    as:"meta"
                                }
                            },
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
            return NextResponse.json({status:"success", message:"Questions fetched successfully",total:data[0].totalCount[0].total, loaded:data[0].data.length, data:data[0].data});
        }
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}



export async function POST(request: NextRequest) {
    try {
        let reqBody = await request.json();
        //reqBody.userId =  JSON.parse((await cookies()).get("userData")?.value || "").id;
        const data = await QuestionModel.create(reqBody);
        const questionMeta = await QuestionMetaModel.create({questionId: data._id});
        return NextResponse.json({status:"success", message:"Question created successfully",data, questionMeta});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}


export async function PUT(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const reqBody = await request.json();
        const data = await QuestionModel.findByIdAndUpdate(id, reqBody);
        return NextResponse.json({status:"success", message:"Question updated successfully",data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const data = await QuestionModel.findByIdAndDelete(id);
        return NextResponse.json({status:"success", message:"Question deleted successfully",data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}