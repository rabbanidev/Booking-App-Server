"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManagmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const service_validation_1 = require("./service.validation");
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(service_validation_1.ServiceManagmentValidation.createService), service_controller_1.ServiceManagmentController.createService);
router.patch('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(service_validation_1.ServiceManagmentValidation.updateService), service_controller_1.ServiceManagmentController.updateService);
router.delete('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), service_controller_1.ServiceManagmentController.deleteService);
router.get('/:id', service_controller_1.ServiceManagmentController.getService);
router.get('/', service_controller_1.ServiceManagmentController.getServices);
exports.ServiceManagmentRoutes = router;
