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
exports.AllUsersService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const superAdmin_model_1 = __importDefault(require("../superAdmin/superAdmin.model"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const enum_1 = require("../../../enum/enum");
const users_model_1 = __importDefault(require("./users.model"));
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const users_utils_1 = require("./users.utils");
const createSuperAdmin = (superAdmin, userData) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Create super admin
        const superAdminPayload = Object.assign(Object.assign({}, superAdmin), { email: userData.email });
        const newSuperAdmin = yield superAdmin_model_1.default.create([superAdminPayload], {
            session,
        });
        if (!newSuperAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create super admin!');
        }
        // Create a new user
        const userPayload = Object.assign(Object.assign({}, userData), { role: enum_1.ENUMS_USER_ROLE.SUPER_ADMIN, superAdmin: newSuperAdmin[0]._id });
        const newUser = yield users_model_1.default.create([userPayload], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user!');
        }
        newUserAllData = newUser[0];
        // Commit transaction and end session
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    // Populate all fields
    if (newUserAllData) {
        newUserAllData = yield users_model_1.default.findOne({
            email: newUserAllData.email,
        }).populate({
            path: 'superAdmin',
        });
    }
    return newUserAllData;
});
const createAdmin = (admin, userData) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Create super admin
        const adminPayload = Object.assign(Object.assign({}, admin), { email: userData.email });
        const newAdmin = yield admin_model_1.default.create([adminPayload], {
            session,
        });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create admin!');
        }
        // Create a new user
        const userPayload = Object.assign(Object.assign({}, userData), { role: enum_1.ENUMS_USER_ROLE.ADMIN, admin: newAdmin[0]._id });
        const newUser = yield users_model_1.default.create([userPayload], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user!');
        }
        newUserAllData = newUser[0];
        // Commit transaction and end session
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    // Populate all fields
    if (newUserAllData) {
        newUserAllData = yield users_model_1.default.findOne({
            email: newUserAllData.email,
        }).populate({
            path: 'admin',
        });
    }
    return newUserAllData;
});
const createUser = (user, othersData) => __awaiter(void 0, void 0, void 0, function* () {
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
    // Populate all fields
    if (newUserAllData) {
        newUserAllData = yield users_model_1.default.findOne({
            email: newUserAllData.email,
        }).populate({
            path: 'user',
        });
    }
    return newUserAllData;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.find()
        .populate(['superAdmin', 'admin', 'user'])
        .sort({ createdAt: -1 });
    return result;
});
const updateUserRole = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = payload;
    const result = yield users_model_1.default.findByIdAndUpdate(id, {
        $set: { role: role },
    }, { new: true });
    // .populate({
    //   path: role,
    // });
    return result;
});
const myInfo = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.findById(authUser.userId).populate(authUser.role === enum_1.ENUMS_USER_ROLE.SUPER_ADMIN ? 'superAdmin' : authUser.role);
    return result;
});
const updateMyProfile = (authUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield (0, users_utils_1.exitUserInfo)(authUser);
    if ((authUser === null || authUser === void 0 ? void 0 : authUser.role) === enum_1.ENUMS_USER_ROLE.USER && exitUser.user) {
        (0, users_utils_1.checkActiveUser)(exitUser.user);
    }
    let result = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        let updatedUser = null;
        if (authUser.role === enum_1.ENUMS_USER_ROLE.USER) {
            updatedUser = yield user_model_1.default.findByIdAndUpdate(exitUser.user, payload, {
                new: true,
                session,
            });
        }
        else if (authUser.role === enum_1.ENUMS_USER_ROLE.ADMIN) {
            updatedUser = yield admin_model_1.default.findByIdAndUpdate(exitUser.admin, payload, {
                new: true,
                session,
            });
        }
        else {
            updatedUser = yield superAdmin_model_1.default.findByIdAndUpdate(exitUser.superAdmin, payload, {
                new: true,
                session,
            });
        }
        if (!updatedUser) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update user!');
        }
        // Updated Main USer
        const updatedMainUser = yield users_model_1.default.findByIdAndUpdate(exitUser._id, { $set: { email: payload.email } }, {
            new: true,
            session,
        });
        if (!updatedMainUser) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update user!');
        }
        // Set updated user in result variable
        result = updatedMainUser;
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
        result = yield users_model_1.default.findOne({ email: result.email }).populate(result.role === enum_1.ENUMS_USER_ROLE.SUPER_ADMIN ? 'superAdmin' : result.role);
    }
    return result;
});
const getAllNormalUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.find({ role: enum_1.ENUMS_USER_ROLE.USER }).populate(enum_1.ENUMS_USER_ROLE.USER);
    return result;
});
const updateUserByAuthority = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield users_model_1.default.findById(userId);
    if (!exitUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    let result = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        let updatedUser = null;
        if (exitUser.role === enum_1.ENUMS_USER_ROLE.USER) {
            updatedUser = yield user_model_1.default.findByIdAndUpdate(exitUser.user, payload, {
                new: true,
                session,
            });
        }
        else if (exitUser.role === enum_1.ENUMS_USER_ROLE.ADMIN) {
            updatedUser = yield admin_model_1.default.findByIdAndUpdate(exitUser.user, payload, {
                new: true,
                session,
            });
        }
        if (!updatedUser) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update user!');
        }
        // Updated Main USer
        const updatedMainUser = yield users_model_1.default.findByIdAndUpdate(exitUser._id, { $set: { email: payload.email } }, {
            new: true,
            session,
        });
        if (!updatedMainUser) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update user!');
        }
        // Set updated user in result variable
        result = updatedMainUser;
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
        result = yield users_model_1.default.findOne({ email: result.email }).populate('user');
    }
    return result;
});
const singleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.findById(id).populate([
        'admin',
        'superAdmin',
        'user',
    ]);
    return result;
});
const manageEnableUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield user_model_1.default.findById(id, { active: 1 }).lean();
    const result = yield user_model_1.default.findByIdAndUpdate(id, {
        $set: {
            active: !(exitUser === null || exitUser === void 0 ? void 0 : exitUser.active),
        },
    }, { new: true });
    return result;
});
exports.AllUsersService = {
    createSuperAdmin,
    createAdmin,
    createUser,
    getAllUsers,
    updateUserRole,
    myInfo,
    updateMyProfile,
    getAllNormalUsers,
    updateUserByAuthority,
    singleUser,
    manageEnableUser,
};
