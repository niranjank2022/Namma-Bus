const jwt = require("jsonwebtoken");

const authorizeJWT = (req, res, next) => {

    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization field missing in the header" });
    }

    const authToken = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }   
    catch (error) {
        res.status(403).json({
            message: "Invalid or expired token",
            error
        });
    }
}

module.exports = authorizeJWT;