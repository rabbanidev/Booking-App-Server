"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxSize: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isUpcoming: {
        type: String,
        default: false,
    },
    facilities: [
        {
            type: String,
        },
    ],
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    numOfReviews: {
        type: Number,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Service = (0, mongoose_1.model)('Service', serviceSchema);
exports.default = Service;
