import mongoose from 'mongoose';

interface IContact {
    name: string;
    email: string;
    subject: string;
    message: string;
    userId: mongoose.Schema.Types.ObjectId | null;
}

const contactSchema = new mongoose.Schema<IContact>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", default: null}
}, {timestamps: true, versionKey: false});

const ContactModel = mongoose.models?.contacts || mongoose.model("contacts", contactSchema);
export default ContactModel;
