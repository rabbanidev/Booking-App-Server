"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminValidation = void 0;
const zod_1 = require("zod");
const updateProfile = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.SuperAdminValidation = {
    updateProfile,
};
