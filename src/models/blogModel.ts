import mongoose from 'mongoose';

interface IBlog {
    title: string;
    content: string;
    slug: string;
    categoryId: [mongoose.Types.ObjectId];
    tagId: [mongoose.Types.ObjectId];
    image: string;
    authorId: mongoose.Types.ObjectId;
    status: string;
}

const BlogSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    content: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    categoryId: {type: [mongoose.Schema.Types.ObjectId], required: true, ref: "categories"},
    tagId: {type: [mongoose.Schema.Types.ObjectId], required: true, ref: "tags"},
    image: {type: String, required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "users"},
    status: {type: String, enum: ['Published', 'Draft'], default: 'Draft'},
}, {timestamps: true, versionKey: false});

BlogSchema.index({ slug: 1, title: 1 }, { unique: true });

const BlogModel = mongoose.models?.blogs || mongoose.model<IBlog>("blogs", BlogSchema);

export default BlogModel;