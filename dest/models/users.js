var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt.hash(this.password, 10);
        next();
    });
});
// Method to verify the user password
userSchema.methods.isValidPassword = function (passwd) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(passwd, this.password);
    });
};
userSchema.methods.cancelTicket = function (busId, seatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var ticketIndex = this.bookedTickets.findIndex(ticket => ticket.busId === busId && ticket.seatId === seatId);
            if (ticketIndex == -1) {
                return { success: false, message: "Ticket not found" };
            }
            this.bookedTickets.splice(ticketIndex, 1);
            yield this.save();
            return { success: true, message: "Successfully deleted" };
        }
        catch (error) {
            return { success: false, message: "Error has occurred", error };
        }
    });
};
module.exports = new mongoose.model("User", userSchema);
