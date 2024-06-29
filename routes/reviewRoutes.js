// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/reviews/:postId',verifyToken, ReviewController.addReview);
router.get('/reviews/:postId',verifyToken, ReviewController.getReviewsByPostId);

module.exports = router;
