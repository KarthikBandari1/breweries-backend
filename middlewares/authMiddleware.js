// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
        token = authHeader.split(" ")[1];
    }

    if (token==undefined) {
        return res.status(401).send({ message: "Invalid JWT Token" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(401).send({ message: "Invalid JWT Token" });
        }
        req.email = payload.email;
        next();
    });
};

module.exports = {
    verifyToken
};


