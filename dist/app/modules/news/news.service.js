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
exports.NewsService = void 0;
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const news_model_1 = require("./news.model");
const createNews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield news_model_1.News.create(payload);
    return result;
});
const updateNews = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield news_model_1.News.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield news_model_1.News.findByIdAndDelete(id);
    return result;
});
const getNewses = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination options
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield news_model_1.News.find({})
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //   total documents
    const total = yield news_model_1.News.countDocuments({});
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield news_model_1.News.findById(id);
    return result;
});
exports.NewsService = {
    createNews,
    updateNews,
    deleteNews,
    getNewses,
    getNews,
};
