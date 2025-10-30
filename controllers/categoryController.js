import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // текущая страница
        const limit = parseInt(req.query.limit) || 10; // количество на странице
        const skip = (page - 1) * limit;

        const total = await Category.countDocuments(); // всего записей
        const totalPages = Math.ceil(total / limit);

        const categories = await Category.find().skip(skip).limit(limit);

        res.json({
            currentPage: page,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
            totalPages,
            limit,
            data: categories
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Получить одну категорию
export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Создать категорию
export const createCategory = async (req, res) => {
    try {
        const { title, image, active, lang } = req.body;
        const category = new Category({ title, image, active, lang });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Обновить категорию
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Удалить категорию
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
