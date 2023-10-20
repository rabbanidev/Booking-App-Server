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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const service_model_1 = __importDefault(require("../service/service.model"));
const review_model_1 = require("./review.model");
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const createReview = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitService = yield service_model_1.default.findById(payload.service);
    if (!exitService) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found!');
    }
    const exitReview = yield review_model_1.Review.findOne({
        service: payload.service,
        user: authUserId,
    });
    if (exitReview) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already reviewed!');
    }
    let numOfReviews = (exitService === null || exitService === void 0 ? void 0 : exitService.numOfReviews) ? exitService.numOfReviews : 0;
    numOfReviews = numOfReviews + 1;
    let rating = (exitService === null || exitService === void 0 ? void 0 : exitService.rating) ? exitService.rating : 0;
    rating = ((rating + payload.rating) / numOfReviews).toFixed(2);
    rating = Number(rating);
    let result = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateService = yield service_model_1.default.findByIdAndUpdate(payload.service, {
            numOfReviews,
            rating,
        }, { new: true, session });
        if (!updateService) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update service!');
        }
        const createReviews = yield review_model_1.Review.create([Object.assign(Object.assign({}, payload), { user: authUserId })], { session });
        if (!createReviews.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create reviewed!');
        }
        result = createReviews[0];
        // Commit transaction and end session
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (result) {
        result = yield review_model_1.Review.findOne({
            service: result.service,
            user: result.user,
        }).populate(['user', 'service']);
        return result;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create reviewed!');
});
const getReviewsByService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({
        service: serviceId,
    }).populate([
        {
            path: 'user',
            populate: {
                path: 'user',
            },
        },
        // {
        //   path: 'service',
        // },
    ]);
    return result;
});
const getReviews = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination options
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield review_model_1.Review.find()
        .populate([
        {
            path: 'user',
            populate: {
                path: 'user',
            },
        },
        {
            path: 'service',
        },
    ])
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //   total documents
    const total = yield service_model_1.default.countDocuments({});
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.ReviewService = {
    createReview,
    getReviewsByService,
    getReviews,
};
