import mongoose from "mongoose";

interface ITag {
    name: string;
    slug: string;
    description: string;
    image: string;
}

const tagSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    description: {type: String},
    image: {type: String},
}, {timestamps: true, versionKey: false});

const TagModel = mongoose.models?.tags || mongoose.model<ITag>("tags", tagSchema);

export default TagModel;
