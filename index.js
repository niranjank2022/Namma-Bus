// Importing required libraries
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const dotenv = require("dotenv");

// Import .env variables
dotenv.config({path: "./.env"});
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Creating the app instance
const app = express();

// Connecting to the database
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("Connected to Database.");
})
.catch(() => {
    console.log("Error connecting database.");
});

// Adding the middlewares to the app
app.use(express.json());

// Adding the routes to the app
app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);


// App is listening for requests from clients in specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
