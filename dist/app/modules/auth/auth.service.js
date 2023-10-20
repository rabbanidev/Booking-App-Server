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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_model_1 = __importDefault(require("../users/users.model"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const enum_1 = require("../../../enum/enum");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = new users_model_1.default(); // instance method
    // Check user is exit
    const userExit = yield user.userExit(email);
    if (!userExit) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not found!');
    }
    // Match Password
    const isMatchedPassword = (userExit === null || userExit === void 0 ? void 0 : userExit.password) &&
        (yield user.matchPassword(password, userExit.password));
    if (!isMatchedPassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password does not matched!');
    }
    //   Generate access token & refresh token
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { _id: userId, role } = userExit;
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        userId,
        role,
    }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        userId,
        role,
    }, config_1.default.jwt.refress_secret, config_1.default.jwt.refress_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifyToken = null;
    try {
        verifyToken = jwtHelpers_1.jwtHelpers.verifyToken(payload, config_1.default.jwt.refress_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token!');
    }
    // Check user exit in database
    const { userId } = verifyToken;
    const userExit = yield users_model_1.default.findById(userId);
    if (!userExit) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    //  Generate a new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.generateToken({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        userId: userExit._id,
        role: userExit.role,
    }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const register = (user, othersData) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = new users_model_1.default(); // instance method
    const userExit = yield allUser.userExit(othersData.email);
    if (userExit) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already registered!');
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Create user
        const userPayload = Object.assign(Object.assign({}, user), { email: othersData.email });
        const newUser = yield user_model_1.default.create([userPayload], {
            session,
        });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create user!');
        }
        // Create a new user for all users model
        const mainUserPayload = Object.assign(Object.assign({}, othersData), { role: enum_1.ENUMS_USER_ROLE.USER, user: newUser[0]._id });
        const mainUserresult = yield users_model_1.default.create([mainUserPayload], { session });
        if (!mainUserresult.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user!');
        }
        newUserAllData = mainUserresult[0];
        // Commit transaction and end session
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    //   Generate access token & refresh token
    const { _id: userId, role } = newUserAllData;
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        userId,
        role,
    }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        userId,
        role,
    }, config_1.default.jwt.refress_secret, config_1.default.jwt.refress_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AuthService = {
    login,
    refreshToken,
    register,
};
