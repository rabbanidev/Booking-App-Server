"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBack = void 0;
const mongoose_1 = require("mongoose");
const feedbackSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.FeedBack = (0, mongoose_1.model)('FeedBack', feedbackSchema);
