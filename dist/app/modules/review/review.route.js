"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.USER), (0, validateRequestHandler_1.default)(review_validation_1.ReviewValidation.createReview), review_controller_1.ReviewController.createReview);
router.get('/:id', review_controller_1.ReviewController.getReviewsByService);
router.get('/', review_controller_1.ReviewController.getReviews);
exports.ReviewRoutes = router;
