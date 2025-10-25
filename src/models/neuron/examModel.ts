import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    image: {type: String},
    slug: {type: String},
}, { timestamps: true , versionKey: false });

const ExamModel = mongoose.models?.exams || mongoose.model("Exams", ExamSchema);

export default ExamModel;