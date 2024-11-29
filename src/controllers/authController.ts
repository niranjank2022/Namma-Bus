import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users";
import { LITERALS, MESSAGES, VARIABLES } from "../../lib/constants";

export async function login(req: Request, res: Response) {
  try {
    const { email, username, password, isAdmin } = req.body;
    const user = await User.findOne({ username, email, isAdmin });

    // Checking if user already exists
    if (!user) {
      res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND,
      });
      return;
    }

    if (!(await user.isValidPassword(password))) {
      res.status(400).json({
        message: MESSAGES.PASSWORD_INCORRECT,
      });
      return;
    }

    // Create a JWT token and return with the response
    const token = jwt.sign({ userId: user._id }, VARIABLES.JWT_SECRET_KEY, {
      expiresIn: LITERALS.TOKEN_EXPIRATION_DURATION,
    });
    res.status(201).json({ message: MESSAGES.SIGNIN_SUCCESS, token });
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
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
        message: MESSAGES.USER_EXISTS,
      });
      return;
    }

    const user = await User.create({ username, email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
