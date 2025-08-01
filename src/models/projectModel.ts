import mongoose from "mongoose";

export interface IProject extends mongoose.Document {
    title: string;
    slug: string;
    description: string;
    image: string;
    technologies: [mongoose.Types.ObjectId];
    categories: [mongoose.Types.ObjectId];
    skills: [mongoose.Types.ObjectId];
    liveLink: string;
    projectLink: string;
    startDate: Date;
    endDate: Date;
    status: string;
    featured: boolean;
    userId: [mongoose.Types.ObjectId];
}

const ProjectSchema = new mongoose.Schema<IProject>({
    title: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    description: {type: String,},
    image: {type: String, required: true},
    technologies: {type: [mongoose.Schema.Types.ObjectId], required: true, ref: "technologies"},
    categories: {type: [mongoose.Schema.Types.ObjectId], required: true, ref: "categories"},
    skills: {type: [mongoose.Schema.Types.ObjectId], required: true , ref: "skills"},
    liveLink: {type: String,},
    projectLink: {type: String,},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    status: {type: String, enum: ['In Progress', 'Completed', 'On Hold', 'Canceled', 'Draft'], default: 'In Progress'},
    featured: {type: Boolean, default: false},
    userId: {type: [mongoose.Schema.Types.ObjectId], required: true, ref: "users"},
}, {timestamps: true, versionKey: false});

const ProjectModel = mongoose.models?.projects || mongoose.model("projects", ProjectSchema);

export default ProjectModel;