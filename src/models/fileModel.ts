import mongoose from "mongoose";

export interface FileModel {
    userId: mongoose.Schema.Types.ObjectId;
    categoryId: mongoose.Schema.Types.ObjectId;
    name: string;
    url: string;
}

const fileSchema = new mongoose.Schema<FileModel>({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "users"},
    categoryId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "categories"},
    name: {type: String, required: true},
    url: {type: String, required: true},
}, {timestamps: true, versionKey: false});

const FileModel = mongoose.models?.files || mongoose.model("files", fileSchema);

export default FileModel;