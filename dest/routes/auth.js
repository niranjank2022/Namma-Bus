var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();
router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, username, password, isAdmin } = req.body;
        var user = null;
        // Checking if user exists
        user = yield User.findOne({ username, email, isAdmin });
        if (!user) {
            return res.status(404).json({
                message: "Error: User do not exist"
            });
        }
        if (!(yield user.isValidPassword(password))) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }
        // Create a JWT token and return with the response
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ message: "Sign in successfull", token });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}));
router.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Checking if user exists
        const userExists = yield User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "Error: User email already exists"
            });
        }
        const user = yield User.create(req.body);
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}));
module.exports = router;
