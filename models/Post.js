import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    active: {
        type: Boolean,
        default: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    lang: {
        type: String,
        required: true,
        enum: ["en", "ru"],
    }
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);
