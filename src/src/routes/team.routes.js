const express = require('express');
const router = express.Router();
const { query, run, get } = require('../config/database');
const { upload, uploadSmall } = require('../middleware/upload.middleware');
const { authenticateToken } = require('../middleware/auth.middleware');

router.get('/', async (req, res, next) => {
    try {
        const rows = await query("SELECT * FROM team_members ORDER BY sort_order ASC, id ASC");
        res.json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticateToken, uploadSmall.single('image'), async (req, res, next) => {
    try {
        const { name, position, description, sort_order } = req.body;
        const image = req.file ? '/images/' + req.file.filename : req.body.image || null;
        
        const result = await run(
            "INSERT INTO team_members (name, position, description, image, sort_order) VALUES (?, ?, ?, ?, ?)",
            [name, position, description, image, sort_order || 0]
        );
        
        res.status(201).json({ success: true, id: result.lastID, message: 'Team member added' });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', authenticateToken, uploadSmall.single('image'), async (req, res, next) => {
    try {
        const { name, position, description, sort_order } = req.body;
        const image = req.file ? '/images/' + req.file.filename : req.body.image;
        
        if (image) {
            await run(
                "UPDATE team_members SET name = ?, position = ?, description = ?, image = ?, sort_order = ? WHERE id = ?",
                [name, position, description, image, sort_order || 0, req.params.id]
            );
        } else {
            await run(
                "UPDATE team_members SET name = ?, position = ?, description = ?, sort_order = ? WHERE id = ?",
                [name, position, description, sort_order || 0, req.params.id]
            );
        }
        
        res.json({ success: true, message: 'Team member updated' });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
    try {
        await run("DELETE FROM team_members WHERE id = ?", [req.params.id]);
        res.json({ success: true, message: 'Team member deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;