import {categoryService} from "../services/categoryService.js";
import {userController as postService} from "./userController.js";
import isValid from "../utils/isValid.js";
import {validationResult} from "express-validator";
import {fileService as uploadService} from "../services/uploadService.js";
import categoryController from "./categoryController.js";


export const postController = {
    async index (req, res){
        try {
            const options = req.query || {};
            const result = await postService.index(options);
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    async show(req, res){
        try {
            const id = isValid(req.params.id);

            const record = await postService.show(id);
            res.json(record);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    async create (req, res) {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {url} = uploadService.saveImage(req.file, "posts");


            const newRecord = await postService.create({...req.body, image: url,});
            res.status(201).json(newRecord);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    async update (req, res){
        try {

            const id = isValid(req.params.id);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {url} = uploadService.saveImage(req.file, "posts");

            const updated = await postService.update(id, {...req.body, image: url,});
            res.json(updated);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    async  delete(req, res) {
        try {
            const id = isValid(req.params.id);
            const result = await categoryService.delete(id);
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}







export default postController;