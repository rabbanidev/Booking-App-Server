"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum/enum");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(blog_validation_1.BlogValidation.createBlog), blog_controller_1.BlogController.createBlog);
router.patch('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), (0, validateRequestHandler_1.default)(blog_validation_1.BlogValidation.updateBlog), blog_controller_1.BlogController.updateBlog);
router.delete('/:id', (0, auth_1.default)(enum_1.ENUMS_USER_ROLE.ADMIN), blog_controller_1.BlogController.deleteBlog);
router.get('/:id', blog_controller_1.BlogController.getBlog);
router.get('/', blog_controller_1.BlogController.getBlogs);
exports.BlogRoutes = router;
