"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const feedback_validation_1 = require("./feedback.validation");
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequestHandler_1.default)(feedback_validation_1.FeedbackValidation.createFeedback), feedback_controller_1.FeedBackController.createFeedBack);
router.get('/', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.SUPER_ADMIN, enum_1.ENUMS_USER_ROLE.ADMIN), feedback_controller_1.FeedBackController.getFeedBacks);
exports.FeedbackRoutes = router;
