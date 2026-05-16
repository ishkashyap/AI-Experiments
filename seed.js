const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const seedData = require('./seed.json');

const dbPath = process.env.DB_PATH || './database/advocate.db';
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const db = new sqlite3.Database(dbPath);

const query = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => { if (err) reject(err); else resolve(rows); });
});

const run = (sql, params = []) => new Promise((resolve, reject) => {
    db.run(sql, params, function (err) { if (err) reject(err); else resolve(this); });
});

async function seed() {
    console.log('Ensuring tables exist...');

    // Create tables (same as initDB)
    await run(`CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)`);
    await run(`CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, service TEXT, date TEXT, time TEXT, message TEXT, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    await run(`CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, image TEXT, author TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    await run(`CREATE TABLE IF NOT EXISTS website_content (id INTEGER PRIMARY KEY AUTOINCREMENT, page TEXT, section TEXT, content_type TEXT, content TEXT, image TEXT, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    await run(`CREATE TABLE IF NOT EXISTS office_branches (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, phone TEXT, email TEXT, lat TEXT, lng TEXT, is_main INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    await run(`CREATE TABLE IF NOT EXISTS announcements (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, type TEXT, is_active INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    await run(`CREATE TABLE IF NOT EXISTS team_members (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, position TEXT, description TEXT, image TEXT, sort_order INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    await run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, subject TEXT, message TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);

    // Check if data already exists
    const existing = await query("SELECT COUNT(*) as count FROM website_content");
    if (existing[0].count > 0) {
        console.log('Database already has content, skipping seed');
        db.close();
        return;
    }

    console.log('Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await run("INSERT OR IGNORE INTO admin (username, password) VALUES (?, ?)", ['admin', hashedPassword]);

    // Seed website_content
    if (seedData.website_content) {
        for (const item of seedData.website_content) {
            await run(
                "INSERT INTO website_content (page, section, content_type, content, image) VALUES (?, ?, ?, ?, ?)",
                [item.page, item.section, item.content_type, item.content, item.image]
            );
        }
        console.log(`  Inserted ${seedData.website_content.length} content entries`);
    }

    // Seed announcements
    if (seedData.announcements) {
        for (const item of seedData.announcements) {
            await run(
                "INSERT INTO announcements (title, content, type, is_active) VALUES (?, ?, ?, ?)",
                [item.title, item.content, item.type, item.is_active]
            );
        }
        console.log(`  Inserted ${seedData.announcements.length} announcements`);
    }

    // Seed team members
    if (seedData.team_members) {
        for (const item of seedData.team_members) {
            await run(
                "INSERT INTO team_members (name, position, description, image) VALUES (?, ?, ?, ?)",
                [item.name, item.position, item.description, item.image]
            );
        }
        console.log(`  Inserted ${seedData.team_members.length} team members`);
    }

    // Seed blogs
    if (seedData.blogs) {
        for (const item of seedData.blogs) {
            await run(
                "INSERT INTO blogs (title, content, image, author) VALUES (?, ?, ?, ?)",
                [item.title, item.content, item.image, item.author]
            );
        }
        console.log(`  Inserted ${seedData.blogs.length} blogs`);
    }

    console.log('Seed complete!');
    db.close();
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
