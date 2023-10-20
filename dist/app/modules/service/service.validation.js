"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManagmentValidation = void 0;
const zod_1 = require("zod");
const createService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Service name is required!',
        }),
        category: zod_1.z.string({
            required_error: 'Category is required!',
        }),
        location: zod_1.z.string({
            required_error: 'Location is required!',
        }),
        price: zod_1.z
            .number({
            required_error: 'Price is required!',
        })
            .positive(),
        maxSize: zod_1.z
            .number({
            required_error: 'Max size is required!',
        })
            .positive(),
        description: zod_1.z.string({
            required_error: 'Description is required!',
        }),
        image: zod_1.z.string({
            required_error: 'Image is required!',
        }),
        isUpcoming: zod_1.z.boolean().optional(),
        facilities: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
const updateService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        maxSize: zod_1.z.number().positive().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        isUpcoming: zod_1.z.boolean().optional(),
        facilities: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.ServiceManagmentValidation = {
    createService,
    updateService,
};
