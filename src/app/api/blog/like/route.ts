import { connect } from "@/db/dbConfig";
import BlogMetaModel from "@/models/blogMetaModel";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(request: NextRequest) {
    try {
        const { blogId } = await request.json();
        const userId = request.cookies.get("userId")?.value;
            
        console.log("User ID: "+ userId);
        const data = await BlogMetaModel.findOne({blogId});
        
        if(data.userId.includes(userId)){
            return NextResponse.json({status:"error", message:"You have already liked this blog"});
        }else{
            const blogMeta = await BlogMetaModel.findOneAndUpdate({ blogId }, {$inc: { likes: 1 }, userId: userId}, {new: true});
            return NextResponse.json({status:"success", message:"Blog liked"});
        }

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
