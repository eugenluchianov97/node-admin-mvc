import User  from "../models/User.js";
import {paginate} from "../utils/paginate.js";

export const userRepository = {
    async findByEmail(email) {
        return User.findOne({email});
    },
    async findById(id) {
        return User.findById(id);
    },
    async findAll(options = {}) {
        const page = parseInt(options.page, 10) || 1;
        const limit = parseInt(options.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const sortField = options.sort || "createdAt";
        const sortOrder = options.order === "desc" ? -1 : 1;

        const allowedSortFields = ["_id","role", "name", "email","createdAt","updatedAt"];

        const sortBy = allowedSortFields.includes(sortField) ? { [sortField]: sortOrder } : { [sortField]: 1 };

        const [users, total] = await Promise.all([
            User.find({}).sort(sortBy).skip(skip).limit(limit),
            User.countDocuments({}),
        ]);

        return paginate({data:users, total, page, limit,sortBy});
    },

    async create(data) {
        const user = new User(data);
        return user.save();
    },

    async update(id, data) {
        return User.findByIdAndUpdate(id, data, { new:true });
    },

    async delete(id) {
        return User.findByIdAndDelete(id);
    },
};
