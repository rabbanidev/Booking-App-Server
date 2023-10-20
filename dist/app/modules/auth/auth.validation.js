"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const gender_1 = require("../../../constants/gender");
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required!',
        })
            .email({ message: 'Invalid email address!' }),
        password: zod_1.z.string({
            required_error: 'Password is required!',
        }),
    }),
});
const refreshToken = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
const register = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required!' })
            .email({ message: 'Invalid email!' }),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
        user: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required!',
                }),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required!',
                }),
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact No is required!',
            }),
            gender: zod_1.z.enum([...gender_1.genders]).optional(),
            dob: zod_1.z.string().optional(),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
exports.AuthValidation = {
    login,
    refreshToken,
    register,
};
