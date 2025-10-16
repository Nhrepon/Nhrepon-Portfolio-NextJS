import mongoose from "mongoose";

const QuestionMetaSchema =new mongoose.Schema({
    questionId: {type: mongoose.Types.ObjectId, required: true},
    explanation:{type:String,},
    year:{type:Number,},
    description:{type:String,},
    categoryId:{type:[mongoose.Schema.Types.ObjectId],},
    examId:{type: [mongoose.Schema.Types.ObjectId],},
    subjectId:{type: [mongoose.Schema.Types.ObjectId],},
    topicId:{type: [mongoose.Schema.Types.ObjectId],},
}, { timestamps: true , versionKey: false });

const QuestionMetaModel = mongoose.models?.questionMeta || mongoose.model("QuestionMeta", QuestionMetaSchema);

export default QuestionMetaModel;
