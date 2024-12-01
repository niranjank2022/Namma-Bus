// Importing required libraries
import express, { Application } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";
import { authorizeJWT } from "./middlewares/authorizer";
import { MESSAGES, VARIABLES } from "./../lib/constants";

// Initializing the app instance
const app: Application = express();

// Connecting to the database
mongoose
  .connect(VARIABLES.MONGODB_URI)
  .then(() => {
    console.log(MESSAGES.DB_CONNECTION_SUCCESS);
  })
  .catch(() => {
    console.log(MESSAGES.DB_CONNECTION_FAILURE);
  });

// Adding the middlewares to the app
app.use(express.json());

// Adding the routes to the app
app.use(authRoutes);
app.use("/admin", authorizeJWT, adminRoutes);
app.use("/user", authorizeJWT, userRoutes);

// App is listening for requests from clients in specified PORT
app.listen(VARIABLES.PORT, () => {
  console.log(MESSAGES.SERVER_RUNNING);
});
