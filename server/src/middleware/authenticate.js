const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: "no token provided"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // paass control to route handler
    } catch (err) {
        return res.status(401).json({error: 'invalid or epxired token'})
    }
};

module.exports = authenticate;