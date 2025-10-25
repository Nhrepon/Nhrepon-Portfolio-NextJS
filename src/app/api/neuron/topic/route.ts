
import {NextRequest, NextResponse} from "next/server";
import TopicModel from "@/models/neuron/topicModel";
import {connectDatabase} from "@/db/dbConfig";
import {generateSlug} from "@/utility/Utility";

await connectDatabase();
export async function GET(request:NextRequest){
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const id = request.nextUrl.searchParams.get("id");
    try {
        if(id){
            const data = await TopicModel.findById(id);
            return NextResponse.json({status:"success", message:"Topic fetched successfully", data});
        }else{
            const data = await TopicModel.aggregate([
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
            return NextResponse.json({status:"success", message:"Topics fetched successfully",total:data[0].totalCount[0].total, loaded:data[0].data.length, data:data[0].data});
        }
    }catch (e:any) {
        return NextResponse.json({status:"error", message:e.message, data:e});
    }
}

export async function POST(req: NextRequest){
    try {
        let reqBody = await req.json();
        reqBody.slug = generateSlug(reqBody.name);
        const data = await TopicModel.create(reqBody);
        return NextResponse.json({status:"success", message:"Topic created successfully", data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}

export async function PUT(req:NextRequest){
    try {
        const reqBody = req.json();
        const data = await TopicModel.updateOne(reqBody);
        return NextResponse.json({status:"success", message:"Exam updated successfully", data});
    }catch (e:any) {
        return NextResponse.json({status:"failed", message:e.message, data:e});
    }
}

export async function DELETE(req:NextRequest){
    const id = req.nextUrl.searchParams.get("id");
    const data = await TopicModel.findByIdAndDelete(id);
    return NextResponse.json({status:"success", message:"Topic deleted successfully", data});
}

