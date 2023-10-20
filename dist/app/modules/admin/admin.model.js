"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const gender_1 = require("../../../constants/gender");
const adminSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: gender_1.genders,
    },
    dob: {
        type: String,
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Admin = (0, mongoose_1.model)('Admin', adminSchema);
exports.default = Admin;
