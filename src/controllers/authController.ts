import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users";


export async function login(req: Request, res: Response) {
    try {
        const { email, username, password, isAdmin } = req.body;
        const user = await User.findOne({ username, email, isAdmin });

        // Checking if user already exists
        if (!user) {
            res.status(404).json({
                message: "Error: User do not exist"
            });
            return;
        }

        if (!(await user.isValidPassword(password))) {
            res.status(400).json({
                message: "Incorrect password"
            });
            return;
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
}

export async function register(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;

        // Checking if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({
                message: "Error: User email already exists"
            });
            return;
        }

        const user = await User.create({ username, email, password });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
