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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManagmentService = void 0;
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const service_constant_1 = require("./service.constant");
const service_model_1 = __importDefault(require("./service.model"));
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, location, price, maxSize, description, image, isUpcoming, facilities, } = payload;
    const createObj = {
        name,
        category,
        location,
        price,
        maxSize,
        description,
        image,
    };
    if (facilities) {
        createObj.facilities = facilities;
    }
    if (isUpcoming) {
        createObj.isUpcoming = true;
        // createObj.isAvailable = false;
    }
    // else {
    //   createObj.isAvailable = true;
    // }
    const result = yield service_model_1.default.create(payload);
    return result;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findByIdAndDelete(id);
    return result;
});
const getServices = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andConditions = [];
    // Search implementation
    if (searchTerm) {
        andConditions.push({
            $or: service_constant_1.serviceSearchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // min and max price implemenation
    if (minPrice) {
        andConditions.push({
            price: {
                $gte: minPrice || 0,
            },
        });
    }
    if (maxPrice) {
        andConditions.push({
            price: {
                $lte: maxPrice || Infinity,
            },
        });
    }
    // Filters implementation
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // pagination options
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield service_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //   total documents
    const total = yield service_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findById(id);
    return result;
});
exports.ServiceManagmentService = {
    createService,
    updateService,
    deleteService,
    getServices,
    getService,
};
