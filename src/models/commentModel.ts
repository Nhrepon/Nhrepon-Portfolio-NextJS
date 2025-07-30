import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    comment: {type: String, required: true},
    blogId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "blogs"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "users" , default: null},
}, {timestamps: true, versionKey: false});

const CommentModel = mongoose.models?.comments || mongoose.model("comments", commentSchema);

export default CommentModel;
