// models/Review.js
const db = require('../db/config');

const Review = {};

Review.create = (rating, description, email, postId, callback) => {
    db.run('INSERT INTO reviews (rating, description, userName, postId) VALUES (?, ?, ?, ?)', [rating, description, email, postId], callback);
};

Review.findByPostId = (postId, callback) => {
    db.all('SELECT * FROM reviews WHERE postId = ?', [postId], callback);
};

module.exports = Review;
