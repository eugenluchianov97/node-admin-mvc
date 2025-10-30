import {postRepository} from "../repositories/postRepository.js";


const RECORD_NOT_FOUND = 'Record not found'

export const categoryService = {
    async index(options) {
        return postRepository.findAll(options)
    },

    async show(id) {
        const category = await postRepository.findById(id);

        if (!category) {
            throw new Error(RECORD_NOT_FOUND);
        }
        return category;
    },

    async create(data) {
        return postRepository.create(data);
    },

    async update(id, data) {
        const category = await postRepository.update(id, data);
        if (!category) {
            throw new Error(RECORD_NOT_FOUND);
        }
        return category;
    },

    async delete(id) {
        const category = await postRepository.delete(id);
        if (!category) {
            throw new Error(RECORD_NOT_FOUND);
        }
        return { message: "Record deleted" };
    },
};
