import { categoryRepository } from "../repositories/categoryRepository.js";

export const categoryService = {
    async index(options) {
        return categoryRepository.findAll(options)
    },

    async show(id) {
        const category = await categoryRepository.findById(id);

        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    },

    async create(data) {
        return categoryRepository.create(data);
    },

    async update(id, data) {
        const category = await categoryRepository.update(id, data);
        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    },

    async delete(id) {
        const category = await categoryRepository.delete(id);
        if (!category) {
            throw new Error("Category not found");
        }
        return { message: "Category deleted" };
    },
};
