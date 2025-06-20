import mongoose from "mongoose";

interface ISkill {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    image: string;
}

const skillSchema = new mongoose.Schema<ISkill>({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
}, {timestamps: true, versionKey: false});

const SkillModel = mongoose.models?.skills || mongoose.model<ISkill>("skills", skillSchema);

export default SkillModel;




