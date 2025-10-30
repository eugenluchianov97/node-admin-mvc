import mongoose from "mongoose";
import {ADMIN, REDACTOR, USER} from "../config/const.js";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    avatar: { type: String, default:null },
    role: { type: String, enum: [USER,REDACTOR, ADMIN], default: USER }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
