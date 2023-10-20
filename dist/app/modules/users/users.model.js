"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const allUsersSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    superAdmin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SuperAdmin',
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Check is user exit using instance method
allUsersSchema.methods.userExit = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield AllUser.findOne({ email }, { email: 1, password: 1, role: 1 });
        return user;
    });
};
// Check match password using instance method
allUsersSchema.methods.matchPassword = function (textPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatchedPassword = yield bcrypt_1.default.compare(textPassword, hashPassword);
        return isMatchedPassword;
    });
};
allUsersSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing password
        const user = this;
        user.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_sald_rounds));
        next();
    });
});
const AllUser = (0, mongoose_1.model)('AllUser', allUsersSchema);
exports.default = AllUser;
