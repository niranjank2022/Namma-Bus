const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bookedTicketSchema = new mongoose.Schema({
    busId: {
        type: String,
        required: true
    },
    seatId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    bookedTickets: {
        type: [bookedTicketSchema],
        default: []
    }
});

// hashing the password before saving them into the database - Security
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to verify the user password
userSchema.methods.isValidPassword = async function (passwd) {
    return await bcrypt.compare(passwd, this.password);
};

userSchema.methods.cancelTicket = async function (busId, seatId) {
    try {

        var ticketIndex = this.bookedTickets.findIndex(ticket => ticket.busId === busId && ticket.seatId === seatId);
        if (ticketIndex == -1) {
            return { success: false, message: "Ticket not found" };
        }

        this.bookedTickets.splice(ticketIndex, 1);
        await this.save();
        return { success: true, message: "Successfully deleted" };
    }
    catch (error) {
        return { success: false, message: "Error has occurred", error }
    }
}

module.exports = new mongoose.model("User", userSchema);