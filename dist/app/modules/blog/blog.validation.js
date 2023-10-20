"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlog = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
    }),
});
const updateBlog = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.BlogValidation = {
    createBlog,
    updateBlog,
};
