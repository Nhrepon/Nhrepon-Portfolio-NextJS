import mongoose from "mongoose";

interface iTopicModel {
    name: string;
    description: string;
    image: string;
    slug: string;
}
const DatabaseSchema = new mongoose.Schema<iTopicModel>({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    image: {type: String},
    slug: {type: String},
},{timestamps: true, versionKey: false});

const TopicModel = mongoose.models?.Topics || mongoose.model("Topics", DatabaseSchema);

export default TopicModel;