const express = require('express');
const router = express.Router();
const User = require('./../models/users');
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', { title: "Namma Bus" });
});

/* GET signup page */
router.get('/signup', (req, res) => {
	res.render('signup', { title: "Namma Bus: Sign Up" });
});

/* POST signup page */
router.post('/signup', async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// Check if user exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).send("User already exists.");
		}

		const newUser = User( {username, email, password} );
		await newUser.save();
		return res.status(201).send("Signed up successfully");
	}
	catch (error) {
		console.log("Error signing up. - ", error);
		res.status(500).send("Error occurred during signing up.");
	}
	
});

/* GET signin page */
router.get('/signin', (req, res) => {
	res.render('signin', { title: "Namma Bus: Sign In" });
});

/* POST signin page */
router.post('/signin', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "User not found." });
		}

		if (await user.isValidPassword(password)) {
			return res.status(400).json({ message: "Incorrect password." });
		}

		// Create a JWT token and return with the response
		const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
		res.status(200).json({message: "Sign in successfull", token});
	}
	catch (error) {
		console.error("Error occurred while signing in");
		res.status(500).json({ message: "Error signing in", error });
	}
});
module.exports = router;
