// db/config.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to SQLite database');

        // Create tables if they don't exist
        db.serialize(() => {
            // Create Users Table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )`);


            // Create Reviews Table
            db.run(`CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rating REAL NOT NULL CHECK (rating BETWEEN 1 AND 5),
                description TEXT,
                userName TEXT NOT NULL,
                postId TEXT NOT NULL
            )`);
        });
    }
});

module.exports = db;
