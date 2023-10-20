"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const cart_validation_1 = require("./cart.validation");
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.post('/add-to-cart', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.USER), (0, validateRequestHandler_1.default)(cart_validation_1.CartValidation.addToCart), cart_controller_1.CartController.addToCart);
router.delete('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.USER), cart_controller_1.CartController.removeFromCart);
router.get('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.USER), cart_controller_1.CartController.singleCartItem);
router.get('/', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.USER), cart_controller_1.CartController.myCarts);
exports.CartRoutes = router;
