import dotenv from "dotenv";
dotenv.config();


export const VARIABLES = Object.freeze({
    // .env variables
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
});

export const LITERALS = Object.freeze({
    TOKEN_EXPIRATION_DURATION: "1h",
});

export const MESSAGES = Object.freeze({
    // Database connection messages
    DB_CONNECTION_SUCCESS: "Connected to Database successfully.",
    DB_CONNECTION_FAILURE: "Error connecting to Database.",

    // Server messages
    SERVER_RUNNING: `Server is running on port ${VARIABLES.PORT}`,

    // Middlewares messages
    AUTH_HEADER_MISSING: "Authorization field is missing in Request's header",
    TOKEN_ERROR_MESSAGE: "Invalid or expired token",

    // Controller messages
    USER_NOT_FOUND: "User not found.",
    USER_EXISTS: "User already exists",
    RECORD_NOT_FOUND: "No records were found.",
    RECORD_EXISTS: "Record already exists",
    DELETE_SUCCESS: "Successfully deleted",
    BOOK_SUCCESS: "Successfuly ticket has been booked",
    ADD_TRIP_SUCCESS: "Successfuly trip has been added",
    RESET_FAILURE: "Resetting bus failed.",

    // Authentication messages
    PASSWORD_INCORRECT: "Incorrect password entered",
    SIGNIN_SUCCESS: "Successfully signed in.",
    SIGNUP_SUCCESS: "Account created successfully.",

    // Error messages
    ERROR_MESSAGE: "Some error has occcurred.",
});