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
exports.AdminService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const users_model_1 = __importDefault(require("../users/users.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = __importDefault(require("./admin.model"));
const updateProfile = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Update (All User Model)
        const updatedUser = yield users_model_1.default.findByIdAndUpdate(authUserId, { $set: { email: payload.email } }, { new: true, session });
        if (!(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to profile update!');
        }
        // Update Super Admin Model
        const updatedAdmin = yield admin_model_1.default.findByIdAndUpdate(updatedUser.admin, { $set: payload }, { new: true, session });
        if (!(updatedAdmin === null || updatedAdmin === void 0 ? void 0 : updatedAdmin._id)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to profile update!');
        }
        result = updatedAdmin;
        // Commit transaction and end session
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (result) {
        result = yield admin_model_1.default.findById(result._id);
    }
    return result;
});
exports.AdminService = {
    updateProfile,
};
