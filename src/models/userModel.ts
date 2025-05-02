import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    userRole: 'admin' | 'user';
    isVerified: boolean;
    otp: string;
    otpExpire?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    userName: {type: String, required: [true, "Provide a user name."], unique: true},
    email: {type: String, unique: true, required: [true, "Email required"]},
    password: {type: String, required: [true, "Password required"]},
    userRole: {type: String, enum: ['admin', 'user'], default: "user"},
    isVerified: {type: Boolean, default: false},
    otp: {type: String, default: "0"},
    otpExpire: {type: Date},
}, {timestamps: true, versionKey: false});

const UserModel: Model<IUser> = mongoose.models.users || mongoose.model<IUser>("users", userSchema);
export default UserModel;
//module.exports = UserModel;