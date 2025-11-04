import {connectDatabase} from "@/db/dbConfig";
import BlogMetaModel from "@/models/blogMetaModel";
import {NextRequest, NextResponse} from "next/server";


export async function POST(request: NextRequest) {
    await connectDatabase();
    try {
        const {blogId} = await request.json();
        if (!blogId || typeof blogId !== "string") {
            return NextResponse.json({status: "error", message: "Blog ID is required"});
        }
        //const userId = request.cookies.get("userId")?.value;
        const userId = JSON.parse(request.cookies.get("userData")?.value || "").id;

        const data = await BlogMetaModel.findOne({blogId});

        if (data.userId.includes(userId)) {
            return NextResponse.json({status: "error", message: "You have already liked this blog"});
        } else {
            const blogMeta = await BlogMetaModel.findOneAndUpdate({blogId}, {
                $inc: {likes: 1},
                userId: userId
            }, {new: true});
            return NextResponse.json({status: "success", message: "Blog liked successfully"});
        }

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}
