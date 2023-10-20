"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUsersValidation = void 0;
const zod_1 = require("zod");
const gender_1 = require("../../../constants/gender");
const enum_1 = require("../../../enum/enum");
const createSuperAdmin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required!' })
            .email({ message: 'Invalid email!' }),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
        superAdmin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required!',
                }),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required!',
                }),
            }),
            contactNo: zod_1.z.string().optional(),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
const createAdmin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required!' })
            .email({ message: 'Invalid email!' }),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required!',
                }),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required!',
                }),
            }),
            gender: zod_1.z.enum([...gender_1.genders]).optional(),
            contactNo: zod_1.z.string().optional(),
            dob: zod_1.z.string().optional(),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
const createUser = zod_1.z.object({
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
const updateUserRole = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([enum_1.ENUMS_USER_ROLE.ADMIN, enum_1.ENUMS_USER_ROLE.USER], {
            required_error: 'Role is required!',
        }),
    }),
});
const updateMyProfile = zod_1.z.object({
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
const updateUserByAuthority = zod_1.z.object({
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
exports.AllUsersValidation = {
    createSuperAdmin,
    createAdmin,
    createUser,
    updateUserRole,
    updateMyProfile,
    updateUserByAuthority,
};
