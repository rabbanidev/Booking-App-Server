"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const gender_1 = require("../../../constants/gender");
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
        dob: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...gender_1.genders]).optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.AdminValidation = {
    updateProfile,
};
