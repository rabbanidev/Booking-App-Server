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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const booking_utils_1 = require("./booking.utils");
const booking_model_1 = require("./booking.model");
const moment_1 = __importDefault(require("moment"));
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const createBooking = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield (0, booking_utils_1.exitService)(String(payload.service));
    if (service && (service === null || service === void 0 ? void 0 : service.maxSize) < payload.totalPerson) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Max size overloaded!');
    }
    const exitingBooking = yield booking_model_1.Booking.find({
        service: payload.service,
        checkOut: { $gte: new Date(payload.checkIn).toISOString() },
    });
    // console.log(new Date(payload.checkIn).toISOString());
    // console.log(exitingBooking);
    if (exitingBooking.length > 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already booked this service.');
    }
    const createObj = Object.assign(Object.assign({}, payload), { user: authUserId });
    const result = yield booking_model_1.Booking.create(createObj);
    return result;
});
const cancelBooking = (authUserId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const exitBooking = yield booking_model_1.Booking.findOne({
        _id: bookingId,
        user: authUserId,
    });
    if (!exitBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking not found!');
    }
    if (exitBooking.status === 'cancelled') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already boking cancelled!');
    }
    const today = (0, moment_1.default)(new Date());
    const bookingLastDay = (0, moment_1.default)(exitBooking.checkOut);
    if (!bookingLastDay.isAfter(today)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Date is or today. You can't cancel this booking!");
    }
    exitBooking.status = 'cancelled';
    yield exitBooking.save();
    return exitBooking;
});
const getMyBookings = (authUserId, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination options
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield booking_model_1.Booking.find({ user: authUserId })
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
    const total = yield booking_model_1.Booking.countDocuments({ user: authUserId });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getBokings = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination options
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield booking_model_1.Booking.find({})
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
    const total = yield booking_model_1.Booking.countDocuments({});
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const acceptBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const exitBooking = yield booking_model_1.Booking.findById(bookingId);
    if (!exitBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking not found!');
    }
    if (exitBooking.status === 'cancelled') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already boking cancelled!');
    }
    exitBooking.status = 'accepted';
    yield exitBooking.save();
    return exitBooking;
});
const rejectedBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const exitBooking = yield booking_model_1.Booking.findById(bookingId);
    if (!exitBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking not found!');
    }
    exitBooking.status = 'rejected';
    yield exitBooking.save();
    return exitBooking;
});
const adjustSchedules = (bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitBooking = yield booking_model_1.Booking.findById(bookingId);
    if (!exitBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking not found!');
    }
    if (exitBooking.status === 'cancelled') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already boking cancelled!');
    }
    // if (exitBooking.status === 'rejected') {
    //   throw new ApiError(httpStatus.BAD_REQUEST, 'Already boking rejected!');
    // }
    exitBooking.checkIn = payload.checkIn;
    exitBooking.checkOut = payload.checkOut;
    exitBooking.status = 'adjust schedule';
    yield exitBooking.save();
    return exitBooking;
});
const getBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findById(bookingId);
    return result;
});
exports.BookingService = {
    createBooking,
    cancelBooking,
    getMyBookings,
    getBokings,
    acceptBooking,
    rejectedBooking,
    adjustSchedules,
    getBooking,
};
