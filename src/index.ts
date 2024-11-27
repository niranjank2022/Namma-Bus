// Importing required libraries
import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";
import { authorizeJWT } from "./middlewares/authorizer";

// Import .env variables
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;
const MONGODB_URI: string = process.env.MONGODB_URI;

// Creating the app instance
const app: Application = express();

// Connecting to the database
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to Database.");
    })
    .catch(() => {
        console.log("Error connecting to database.");
    });

// Adding the middlewares to the app
app.use(express.json());

// Adding the routes to the app
app.use(authRoutes);
app.use("/admin", authorizeJWT, adminRoutes);
app.use("/user", authorizeJWT, userRoutes);


// App is listening for requests from clients in specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
