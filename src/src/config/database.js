const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const { dbPath } = require('./env');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Database connection error:', err);
    else console.log('Connected to SQLite database securely');
});

// Wrap DB methods in Promises for async/await usage
const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const get = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

// Initialize schema
const initDB = async () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            service TEXT,
            date TEXT,
            time TEXT,
            message TEXT,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            image TEXT,
            author TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS website_content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page TEXT,
            section TEXT,
            content_type TEXT,
            content TEXT,
            image TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS office_branches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            phone TEXT,
            email TEXT,
            lat TEXT,
            lng TEXT,
            is_main INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            type TEXT,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS team_members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            position TEXT,
            description TEXT,
            image TEXT,
            sort_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            subject TEXT,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS report_downloads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            state TEXT,
            suit_value TEXT,
            fee_amount TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        
        // Setup initial admin
        db.get("SELECT * FROM admin WHERE username = 'admin'", (err, row) => {
            if (!row) {
                const hashedPassword = bcrypt.hashSync('admin123', 10);
                db.run("INSERT INTO admin (username, password) VALUES (?, ?)", ['admin', hashedPassword]);
            }
        });
    });
};

module.exports = {
    db,
    query,
    get,
    run,
    initDB
};
