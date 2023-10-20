"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const FAQ_validation_1 = require("./FAQ.validation");
const FAQ_controller_1 = require("./FAQ.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(FAQ_validation_1.FAQValidation.createFAQ), FAQ_controller_1.FAQController.createFAQ);
router.patch('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(FAQ_validation_1.FAQValidation.updateFAQ), FAQ_controller_1.FAQController.updateFAQ);
router.delete('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), FAQ_controller_1.FAQController.deleteFAQ);
router.get('/:id', FAQ_controller_1.FAQController.getFAQ);
router.get('/', FAQ_controller_1.FAQController.getFAQs);
exports.FAQRoutes = router;
