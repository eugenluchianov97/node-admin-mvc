import Category from "../models/Category.js";
import {paginate} from "../utils/paginate.js";

export const categoryRepository = {
    async findAll( options = {}) {
        const page = parseInt(options.page, 10) || 1;
        const limit = parseInt(options.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const sortField = options.sort || "createdAt";
        const sortOrder = options.order === "desc" ? -1 : 1;

        const allowedSortFields = ["_id","title", "image", "active","lang","createdAt","updatedAt"];

        const sortBy = allowedSortFields.includes(sortField) ? { [sortField]: sortOrder } : { [sortField]: 1 };

        const [categories, total] = await Promise.all([
            Category.find({}).sort(sortBy).skip(skip).limit(limit),
            Category.countDocuments({}),
        ]);

        return paginate({data:categories, total, page, limit,sortBy});
    },

    async findById(id) {
        return Category.findById(id);
    },

    async create(data) {
        const category = new Category(data);
        return category.save();
    },

    async update(id, data) {
        return Category.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return Category.findByIdAndDelete(id);
    },
};
