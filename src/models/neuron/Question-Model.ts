import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: {type: String, required: true, unique: true},
    options: {type: [String], required: true},
    answers: {type: String, required: true},
    userId: {type: mongoose.Types.ObjectId, required: true},
}, { timestamps: true , versionKey: false });

const QuestionModel = mongoose.models?.Questions || mongoose.model("Questions", QuestionSchema);
export default QuestionModel;