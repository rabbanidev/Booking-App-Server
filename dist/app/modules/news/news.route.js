"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const news_validation_1 = require("./news.validation");
const news_controller_1 = require("./news.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(news_validation_1.NewsValidation.createNews), news_controller_1.NewsController.createNews);
router.patch('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(news_validation_1.NewsValidation.updateNews), news_controller_1.NewsController.updateNews);
router.delete('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), news_controller_1.NewsController.deleteNews);
router.get('/:id', news_controller_1.NewsController.getNewses);
router.get('/', news_controller_1.NewsController.getNews);
exports.NewsRoutes = router;
