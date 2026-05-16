const { query, get, run } = require('../config/database');
const sanitizeHtml = require('sanitize-html');

const getBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        let sql = "SELECT * FROM blogs";
        let params = [];

        if (search) {
            sql += " WHERE title LIKE ? OR content LIKE ?";
            params.push(`%${search}%`, `%${search}%`);
        }

        sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);

        const rows = await query(sql, params);
        
        let countSql = "SELECT COUNT(*) as total FROM blogs";
        let countParams = [];
        if (search) {
            countSql += " WHERE title LIKE ? OR content LIKE ?";
            countParams.push(`%${search}%`, `%${search}%`);
        }
        
        const { total } = await get(countSql, countParams);

        res.json({
            success: true,
            data: rows,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

const getBlogById = async (req, res, next) => {
    try {
        const row = await get("SELECT * FROM blogs WHERE id = ?", [req.params.id]);
        if (!row) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        res.json({ success: true, data: row });
    } catch (err) {
        next(err);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const { title, author } = req.body;
        const content = sanitizeHtml(req.body.content);
        const image = req.file ? '/images/' + req.file.filename : null;

        const result = await run(
            "INSERT INTO blogs (title, content, image, author) VALUES (?, ?, ?, ?)",
            [title, content, image, author || 'Admin']
        );

        res.status(201).json({ success: true, id: result.lastID, message: 'Blog created successfully' });
    } catch (err) {
        next(err);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const { title, author } = req.body;
        const content = sanitizeHtml(req.body.content);

        const existing = await get("SELECT * FROM blogs WHERE id = ?", [req.params.id]);
        if (!existing) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }

        let finalImage = existing.image;
        if (req.file) {
            finalImage = '/images/' + req.file.filename;
        } else if (req.body.image !== undefined) {
            finalImage = req.body.image || existing.image;
        }

        await run(
            "UPDATE blogs SET title = ?, content = ?, image = ?, author = ? WHERE id = ?",
            [title, content, finalImage, author || 'Admin', req.params.id]
        );

        res.json({ success: true, message: 'Blog updated successfully' });
    } catch (err) {
        next(err);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        await run("DELETE FROM blogs WHERE id = ?", [req.params.id]);
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
