"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const superAdmin_validation_1 = require("./superAdmin.validation");
const superAdmin_controller_1 = require("./superAdmin.controller");
const router = express_1.default.Router();
router.patch('/update-profile', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.SUPER_ADMIN), (0, validateRequestHandler_1.default)(superAdmin_validation_1.SuperAdminValidation.updateProfile), superAdmin_controller_1.SuperAdminController.updateProfile);
exports.SuperAdminRoutes = router;
