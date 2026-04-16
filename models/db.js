const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // User
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )
    `);

    // Data Anak
    db.run(`
        CREATE TABLE IF NOT EXISTS child (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            nama TEXT,
            umur INTEGER,
            bb REAL,
            tb REAL,
            lila REAL,
            lingkar_kepala REAL,
            alergi TEXT,
            mikrobiota TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;