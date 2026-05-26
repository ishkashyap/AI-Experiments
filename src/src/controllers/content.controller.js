const { query, run } = require('../config/database');
const sanitizeHtml = require('sanitize-html');

const getContent = async (req, res, next) => {
    try {
        const rows = await query("SELECT * FROM website_content");
        res.json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
};

const createContent = async (req, res, next) => {
    try {
        const { page, section, content_type } = req.body;
        const newContent = req.body.content || '';
        const content = sanitizeHtml(newContent);
        const newImage = req.file ? '/images/' + req.file.filename : null;

        // Check if content exists for this page+section
        const existing = await query("SELECT * FROM website_content WHERE page = ? AND section = ?", [page, section]);
        
        if (existing.length > 0) {
            // Partial update - preserve existing values if new values are empty
            const existingData = existing[0];
            const finalContent = newContent.trim() === '' ? existingData.content : content;
            let finalImage = newImage ? newImage : existingData.image;
            const finalContentType = content_type || existingData.content_type;
            
            // If they are explicitly setting a URL for an image type, clear the uploaded image path
            if (finalContentType === 'image' && newContent.trim() !== '' && !newImage) {
                finalImage = null;
            }
            
            await run(
                "UPDATE website_content SET content_type = ?, content = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE page = ? AND section = ?",
                [finalContentType, finalContent, finalImage, page, section]
            );
            res.json({ success: true, message: 'Content updated successfully' });
        } else {
            // Insert new
            const result = await run(
                "INSERT INTO website_content (page, section, content_type, content, image) VALUES (?, ?, ?, ?, ?)",
                [page, section, content_type || 'text', content, newImage]
            );
            res.status(201).json({ success: true, id: result.lastID, message: 'Content added successfully' });
        }
    } catch (err) {
        next(err);
    }
};

const updateContent = async (req, res, next) => {
    try {
        const { page, section, content_type } = req.body;
        const content = sanitizeHtml(req.body.content || '');

        const existing = await query("SELECT * FROM website_content WHERE id = ?", [req.params.id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, error: 'Content not found' });
        }

        const existingImage = existing[0].image;
        let finalImage = existingImage;

        if (req.file) {
            finalImage = '/images/' + req.file.filename;
        } else if (req.body.image !== undefined) {
            finalImage = req.body.image || existingImage;
        } else if (content_type === 'image' && content.trim() !== '') {
            finalImage = null;
        }

        await run(
            "UPDATE website_content SET page = ?, section = ?, content_type = ?, content = ?, image = ? WHERE id = ?",
            [page, section, content_type, content, finalImage, req.params.id]
        );

        res.json({ success: true, message: 'Content updated successfully' });
    } catch (err) {
        next(err);
    }
};

const deleteContent = async (req, res, next) => {
    try {
        await run("DELETE FROM website_content WHERE id = ?", [req.params.id]);
        res.json({ success: true, message: 'Content deleted successfully' });
    } catch (err) {
        next(err);
    }
};

const saveFooter = async (req, res, next) => {
    try {
        const { section, content } = req.body;
        const page = 'global';
        const content_type = 'text';
        
        // Check if content exists for this section - preserve existing if new content is empty
        const existing = await query("SELECT * FROM website_content WHERE page = ? AND section = ?", [page, section]);
        
        if (existing.length > 0) {
            const finalContent = (content || '').trim() === '' ? existing[0].content : content;
            await run("UPDATE website_content SET content = ? WHERE page = ? AND section = ?", [finalContent, page, section]);
        } else {
            await run("INSERT INTO website_content (page, section, content_type, content) VALUES (?, ?, ?, ?)", [page, section, content_type, content]);
        }
        
        res.json({ success: true, message: 'Content saved successfully' });
    } catch (err) {
        next(err);
    }
};

// Admin Home Page - GET
const getHomePage = async (req, res, next) => {
    try {
        const rows = await query("SELECT * FROM website_content WHERE page = 'home'");

        // Build a clean object from database rows
        const homeData = {};
        rows.forEach(row => {
            if (row.section === 'hero-title') homeData.heroTitle = row.content || '';
            else if (row.section === 'hero-title-2') homeData.heroTitle2 = row.content || '';
            else if (row.section === 'hero-subtitle') homeData.heroSubtitle = row.content || '';
            else if (row.section === 'hero-image') homeData.heroImage = row.image || row.content || '';
            else if (row.section === 'about-image') homeData.aboutImage = row.image || row.content || '';
            else if (row.section === 'about-snippet') homeData.aboutSnippet = row.content || '';
            else if (row.section === 'home-phone') homeData.phone = row.content || '';
            else if (row.section === 'home-email') homeData.email = row.content || '';
        });

        // Return empty object if no data (graceful handling)
        res.json({ success: true, data: homeData });
    } catch (err) {
        // Return empty object instead of crashing
        res.json({ success: true, data: {} });
    }
};

// Admin Home Page - POST (Partial Update)
const updateHomePage = async (req, res, next) => {
    try {
        const { heroTitle, heroTitle2, heroSubtitle, heroImage, aboutSnippet, aboutImage, phone, email } = req.body;

        const sections = [
            { section: 'hero-title', value: heroTitle },
            { section: 'hero-title-2', value: heroTitle2 },
            { section: 'hero-subtitle', value: heroSubtitle },
            { section: 'hero-image', value: heroImage, isImage: true },
            { section: 'about-snippet', value: aboutSnippet },
            { section: 'about-image', value: aboutImage, isImage: true },
            { section: 'home-phone', value: phone },
            { section: 'home-email', value: email }
        ];
        
        for (const item of sections) {
            if (item.value === undefined) continue;
            
            const existing = await query("SELECT * FROM website_content WHERE page = 'home' AND section = ?", [item.section]);
            
            if (existing.length > 0) {
                const finalValue = (item.value || '').trim() === '' ? existing[0].content : item.value;
                if (item.isImage) {
                    const imgVal = req.file ? '/images/' + req.file.filename : (item.value || existing[0].image);
                    await run("UPDATE website_content SET image = ?, updated_at = CURRENT_TIMESTAMP WHERE page = 'home' AND section = ?", [imgVal, item.section]);
                } else {
                    await run("UPDATE website_content SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE page = 'home' AND section = ?", [finalValue, item.section]);
                }
            } else {
                if (item.isImage && item.value) {
                    const imgVal = req.file ? '/images/' + req.file.filename : item.value;
                    await run("INSERT INTO website_content (page, section, content_type, content, image) VALUES ('home', ?, 'image', '', ?)", [item.section, imgVal]);
                } else if (item.value) {
                    await run("INSERT INTO website_content (page, section, content_type, content) VALUES ('home', ?, 'text', ?)", [item.section, item.value]);
                }
            }
        }
        
        res.json({ success: true, message: 'Home page updated successfully' });
    } catch (err) {
        next(err);
    }
};

// Bulk Update Content
const bulkUpdateContent = async (req, res, next) => {
    try {
        const { page, sections } = req.body;
        if (!page || !Array.isArray(sections)) {
            return res.status(400).json({ success: false, error: 'Invalid payload' });
        }

        for (const item of sections) {
            const { section, content } = item;
            const existing = await query("SELECT * FROM website_content WHERE page = ? AND section = ?", [page, section]);
            if (existing.length > 0) {
                await run("UPDATE website_content SET content = ? WHERE page = ? AND section = ?", [content, page, section]);
            } else {
                await run("INSERT INTO website_content (page, section, content_type, content) VALUES (?, ?, 'text', ?)", [page, section, content]);
            }
        }

        res.json({ success: true, message: 'Content saved successfully' });
    } catch (err) {
        next(err);
    }
};

// Bulk Delete Content
const bulkDeleteContent = async (req, res, next) => {
    try {
        const { page, sections } = req.body;
        if (!page || !Array.isArray(sections) || sections.length === 0) {
            return res.status(400).json({ success: false, error: 'Invalid payload' });
        }

        for (const section of sections) {
            await run("DELETE FROM website_content WHERE page = ? AND section = ?", [page, section]);
        }

        res.json({ success: true, message: `${sections.length} items deleted` });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getContent,
    createContent,
    updateContent,
    deleteContent,
    saveFooter,
    getHomePage,
    updateHomePage,
    bulkUpdateContent,
    bulkDeleteContent
};
