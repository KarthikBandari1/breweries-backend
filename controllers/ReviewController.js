// controllers/ReviewController.js
const Review = require('../models/Review');

exports.addReview = (req, res) => {
    const { rating, description } = req.body;
    const {email}=req
    const { postId } = req.params;


    Review.create(rating, description, email, postId, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add review' });
        }
        res.json({ message: 'Review added successfully' });
    });
};

exports.getReviewsByPostId = (req, res) => {
    const { postId } = req.params;

    Review.findByPostId(postId, (err, reviews) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch reviews' });
        }
        res.json(reviews);
    });
};
