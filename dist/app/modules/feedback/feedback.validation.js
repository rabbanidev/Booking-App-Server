"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedback = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required!',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required!',
        })
            .email({ message: 'Invalid email!' }),
        description: zod_1.z.string({
            required_error: 'Name is required!',
        }),
    }),
});
exports.FeedbackValidation = {
    createFeedback,
};
