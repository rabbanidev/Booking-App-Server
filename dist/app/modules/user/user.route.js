"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.patch('/update-profile', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.USER), (0, validateRequestHandler_1.default)(user_validation_1.UserValidation.updateProfile), user_controller_1.UserController.updateProfile);
exports.UserRoutes = router;
