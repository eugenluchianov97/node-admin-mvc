import User  from "../models/User.js";
import {paginate} from "../utils/paginate.js";
import getFilter from "../utils/getFilter.js";



const UserSortFields = ["_id","role", "name", "email","createdAt","updatedAt"];

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


        const allowedSortFields = ["_id","role", "name", "email","createdAt","updatedAt"];

        const allowedFilterFields = ["name","email"];

        const  {sortBy, filter} = getFilter(allowedSortFields,allowedFilterFields,options);


        const [users, total] = await Promise.all([
            User.find(filter).sort(sortBy).skip(skip).limit(limit),
            User.countDocuments(filter),
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
