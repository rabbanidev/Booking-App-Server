"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReview = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string({
            required_error: 'Service ID is required!',
        }),
        rating: zod_1.z
            .number({ required_error: 'Rating is required!' })
            .positive({ message: 'Rating must be positive!' })
            .min(1)
            .max(5),
        description: zod_1.z.string().optional(),
    }),
});
exports.ReviewValidation = {
    createReview,
};
