"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsValidation = void 0;
const zod_1 = require("zod");
const createNews = zod_1.z.object({
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
const updateNews = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.NewsValidation = {
    createNews,
    updateNews,
};
