import { userService } from "../services/userService.js";
import {validationResult} from "express-validator";
import {fileService as uploadService} from "../services/uploadService.js";

export const userController = {
    async index(req, res) {
        try {

            const options = req.query || {};
            const result = await userService.getAll(options);
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async show(req, res) {
        try {
            const user = await userService.getOne(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },

    async create(req, res) {
        try {
            const {url} = uploadService.saveImage(req.file, "users");

            const newUser = await userService.createUser({...req.body, avatar: url,});

            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async update(req, res) {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {url} = uploadService.saveImage(req.file, "users");

            const updatedUser = await userService.updateUser(req.params.id, {...req.body, avatar: url,});

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async delete(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.json({ message: "User deleted" });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },
};
