import { userRepository } from "../repositories/userRepository.js";
import { paginate } from "../utils/paginate.js";
import User from "../models/User.js";

export const userService = {
    async getAll(options = {}) {
        return userRepository.findAll(options)
    },

    async getOne(id) {
        const user = await userRepository.findById(id);
        if (!user) throw new Error("User not found");
        return user;
    },

    async createUser(data) {
        return userRepository.create(data);
    },

    async updateUser(id, data) {
        const user = await userRepository.update(id, data);
        if (!user) throw new Error("User not found");
        return user;
    },

    async deleteUser(id) {
        const user = await userRepository.delete(id);
        if (!user) throw new Error("User not found");
        return user;
    },
};
