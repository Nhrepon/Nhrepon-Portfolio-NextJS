import mongoose from "mongoose";

const DatabaseSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    image: {type: String},
    slug: {type: String},
},{timestamps: true, versionKey:false});

const SubjectModel = mongoose.models?.Subjects || mongoose.model('Subjects', DatabaseSchema);

export default SubjectModel;