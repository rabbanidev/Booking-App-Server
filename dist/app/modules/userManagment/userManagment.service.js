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
exports.UserManagementService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield user_model_1.default.findById(id);
    if (!exitUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    let result = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Update user (AllUser Model or Main user)
        const updatedMainUser = yield users_model_1.default.findOneAndUpdate({ user: id }, { $set: { email: payload.email } }, { new: true, session });
        if (!updatedMainUser) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update user!');
        }
        // Update user (User Model)
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
            session,
        });
        if (!updatedUser) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update user!');
        }
        // Set updated user in result variable
        result = updatedUser;
        // Commit transaction and end session
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return result;
});
const manageUserAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield user_model_1.default.findById(id, { active: 1 }).lean();
    const result = yield user_model_1.default.findByIdAndUpdate(id, {
        $set: {
            active: !(exitUser === null || exitUser === void 0 ? void 0 : exitUser.active),
        },
    }, { new: true });
    return result;
});
exports.UserManagementService = {
    updateUser,
    manageUserAccount,
};
