import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
    try {
        // 🔹 Получаем query-параметры
        const {
            page = 1,
            limit = 10,
            category_id,
            active,
            user_id,
        } = req.query;

        const query = {};

        if (category_id) query.category_id = category_id;
        if (user_id) query.user_id = user_id;
        if (active !== undefined) query.active = active === "true";

        const total = await Post.countDocuments(query);

        const posts = await Post.find(query)
            .populate("category_id", "title")
            .populate("user_id", "username email")
            .sort({ createdAt: -1 }) // последние сверху
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalPages = Math.ceil(total / limit);

        res.json({
            pagination: {
                currentPage: Number(page),
                totalPages,
                perPage: Number(limit),
                totalRecords: total,
                nextPage: Number(page) < totalPages ? Number(page) + 1 : null,
                prevPage: Number(page) > 1 ? Number(page) - 1 : null,
            },
            data: posts,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// 📜 Получить один пост
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("category_id", "title")
            .populate("user_id", "username email");

        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content, image, active, category_id, user_id, slug } = req.body;

        const existing = await Post.findOne({ slug });
        if (existing) {
            return res.status(400).json({ message: "Slug already exists" });
        }

        const post = new Post({ title, content, image, active, category_id, user_id, slug });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { slug } = req.body;
        if (slug) {
            const existing = await Post.findOne({ slug, _id: { $ne: req.params.id } });
            if (existing) return res.status(400).json({ message: "Slug already exists" });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
