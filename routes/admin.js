const express = require('express');
const router = express.Router();
const User = require("./../models/users");
const Bus = require("./../models/buses");
const jwt = require("jsonwebtoken");

router.post("/admin-login", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Checking if user exists
        const user = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({
                message: "Error: User do not exist"
            });
        }

        if (!user.isValidPassword(password)) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        // Create a JWT token and return with the response
		const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
		res.status(200).json({message: "Sign in successfull", token});
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const buses = await Bus.find({});
        if (!buses) {
            return res.status(400).json({
                message: "No bus records found."
            });
        }

        return res.json(buses);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/add-bus", async (req, res) => {
    const bus = await Bus.create(req.body);
    res.json(bus);
});


// router.post("/reset", async (req, res) => {

// })

module.exports = router;