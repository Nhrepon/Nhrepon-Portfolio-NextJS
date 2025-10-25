import mongoose from "mongoose";

const DatabaseSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    image: {type: String},
    slug: {type: String},
},{timestamps: true, versionKey:false});

const NeuronCategoryModel = mongoose.models?.NeuronCategories || mongoose.model("NeuronCategories", DatabaseSchema);

export default NeuronCategoryModel;