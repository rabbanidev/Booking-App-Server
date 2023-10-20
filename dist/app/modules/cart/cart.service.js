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
exports.CartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cart_model_1 = require("./cart.model");
const users_model_1 = __importDefault(require("../users/users.model"));
const addToCart = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = payload;
    const exitCart = yield cart_model_1.Cart.findOne({
        user: authUserId,
        service: serviceId,
    });
    if (exitCart) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service already added to cart!');
    }
    const result = (yield cart_model_1.Cart.create({ user: authUserId, service: serviceId })).populate([
        { path: 'service' },
        {
            path: 'user',
            populate: {
                path: 'user',
            },
        },
    ]);
    return result;
});
const myCarts = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findById(authUserId).populate({
        path: 'user',
    });
    const result = yield cart_model_1.Cart.find({ user: authUserId })
        .populate([{ path: 'service' }])
        .select({ user: 0 });
    return {
        user: user === null || user === void 0 ? void 0 : user.user,
        cartItems: result,
    };
});
const removeFromCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findByIdAndDelete(id);
    return result;
});
const singleCartItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findById(id);
    return result;
});
exports.CartService = {
    addToCart,
    myCarts,
    removeFromCart,
    singleCartItem,
};
