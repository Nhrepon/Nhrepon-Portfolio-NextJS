import mongoose from "mongoose";

interface IBlogMeta {
    _id: mongoose.Types.ObjectId;
    blogId: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    userId:[mongoose.Types.ObjectId];
}

const BlogMetaSchema = new mongoose.Schema({
    blogId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "blogs"},
    views: {type: Number, required: true},
    likes: {type: Number, required: true},
    userId:[mongoose.Schema.Types.ObjectId],
}, {timestamps: true, versionKey: false});

const BlogMetaModel = mongoose.models?.blogMetas || mongoose.model<IBlogMeta>("blogMetas", BlogMetaSchema);

export default BlogMetaModel;
