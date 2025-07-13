import mongoose from "mongoose";

interface ICategory {
    name: string;
    description: string;
    slug: string;
    image: string;
}

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    description: {type: String},
    image: {type: String},
}, {timestamps: true, versionKey: false});

const CategoryModel = mongoose.models?.categories || mongoose.model<ICategory>("categories", categorySchema);

export default CategoryModel;
