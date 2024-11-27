const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, username, password, isAdmin } = req.body;
        var user = null;

        // Checking if user exists
        user = await User.findOne({ username, email, isAdmin });

        if (!user) {
            return res.status(404).json({
                message: "Error: User do not exist"
            });
        }

        if (!(await user.isValidPassword(password))) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        // Create a JWT token and return with the response
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
		res.status(201).json({message: "Sign in successfull", token});
    }
    catch(error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Checking if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "Error: User email already exists"
            });
        }

        const user = await User.create(req.body);
        return res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
});

module.exports = router;
