"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const blog_model_1 = require("./blog.model");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
const getBlogs = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination options
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield blog_model_1.Blog.find({})
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //   total documents
    const total = yield blog_model_1.Blog.countDocuments({});
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(id);
    return result;
});
exports.BlogService = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
    getBlog,
};
