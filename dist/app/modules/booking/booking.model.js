"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const bookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AllUser',
        required: true,
    },
    service: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: booking_constant_1.bookingStatus,
        default: 'pending',
    },
    totalPerson: {
        type: Number,
        required: true,
    },
    customer: {
        name: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
