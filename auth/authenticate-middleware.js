const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const secret = process.env.JWT_SECRET || 'keep it secret, keep it safe';
        console.log(secret);
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log(err);
                console.log(token);
                res.status(401).json({ message: 'shall not pass!' });
            } else {
                req.decodedJwt = decoded;
            next();
            }
        });
    } else {
        res.status(400).json({ you: 'Gotta be a user to pass...' });
    }
};
