"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const gender_1 = require("../../../constants/gender");
const updateProfile = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email!' }).optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        contactNo: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...gender_1.genders]).optional(),
        dob: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    updateProfile,
};
