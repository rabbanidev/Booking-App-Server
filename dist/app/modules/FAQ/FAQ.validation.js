"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQValidation = void 0;
const zod_1 = require("zod");
const createFAQ = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
    }),
});
const updateFAQ = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.FAQValidation = {
    createFAQ,
    updateFAQ,
};
