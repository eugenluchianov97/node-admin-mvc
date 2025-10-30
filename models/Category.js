import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default:null
    },
    active: {
        type: Boolean,
        default: true,
    },
    lang: {
        type: String,
        required: true,
        enum: ["en", "ru"], // можно расширить под другие языки
    }
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);
