// controllers/AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');

exports.register = (req, res) => {
    const { email, password } = req.body;

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to hash password' });
        }

        // Create user in database
        User.create(email, hashedPassword, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.json({ message: 'User registered successfully' });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    User.findByEmail(email, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ error: 'Authentication failed' });
            }

            const payload = {
                email: user.email,
              };
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            res.json({ token });
        });
    });
};
