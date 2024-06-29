// models/User.js
const db = require('../db/config');

const User = {};

User.create = (email, password, callback) => {
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], callback);
};

User.findByEmail = (email, callback) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], callback);
};

module.exports = User;
