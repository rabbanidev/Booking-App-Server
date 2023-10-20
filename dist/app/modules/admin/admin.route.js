"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.patch('/update-profile', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(admin_validation_1.AdminValidation.updateProfile), admin_controller_1.AdminController.updateProfile);
exports.AdminRoutes = router;
