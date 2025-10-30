import Post from "../models/Post.js";
import {paginate} from "../utils/paginate.js";
import getFilter from "../utils/getFilter.js";


export const postRepository = {
    async findAll( options = {}) {
        const page = parseInt(options.page, 10) || 1;
        const limit = parseInt(options.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const allowedSortFields = ["_id", "title", "content", "slug", "image", "active", "lang", "category_id", "user_id", "createdAt", "updatedAt"];

        const allowedFilterFields = ["title","content","slug"];

        const  {sortBy, filter} = getFilter(allowedSortFields,allowedFilterFields,options);

        const [posts, total] = await Promise.all([
            Post.find(filter).sort(sortBy).skip(skip).limit(limit),
            Post.countDocuments(filter),
        ]);

        return paginate({data:posts, total, page, limit,sortBy});
    },

    async findById(id) {
        return Post.findById(id);
    },

    async create(data) {
        const post = new Post(data);
        return post.save();
    },

    async update(id, data) {
        return Post.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return Post.findByIdAndDelete(id);
    },
};
