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
exports.FAQService = void 0;
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const FAQ_model_1 = require("./FAQ.model");
const createFAQ = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FAQ_model_1.FAQ.create(payload);
    return result;
});
const updateFAQ = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FAQ_model_1.FAQ.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteFAQ = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FAQ_model_1.FAQ.findByIdAndDelete(id);
    return result;
});
const getFAQs = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination options
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield FAQ_model_1.FAQ.find({})
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //   total documents
    const total = yield FAQ_model_1.FAQ.countDocuments({});
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getFAQ = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FAQ_model_1.FAQ.findById(id);
    return result;
});
exports.FAQService = {
    createFAQ,
    updateFAQ,
    deleteFAQ,
    getFAQs,
    getFAQ,
};
