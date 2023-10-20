"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const userManagment_controller_1 = require("./userManagment.controller");
const userManagment_validation_1 = require("./userManagment.validation");
const router = express_1.default.Router();
router.patch('/manage-account/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), userManagment_controller_1.UserManagementController.manageUserAccount);
router.patch('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(userManagment_validation_1.UserManagmentValidation.updateUser), userManagment_controller_1.UserManagementController.updateUser);
exports.UserManagementRoutes = router;
