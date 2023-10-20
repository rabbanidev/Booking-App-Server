"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = require("zod");
const addToCart = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required!',
        }),
    }),
});
exports.CartValidation = {
    addToCart,
};
