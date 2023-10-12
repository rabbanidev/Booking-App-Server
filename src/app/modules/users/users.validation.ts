import { z } from 'zod';
import { genders } from '../../../constants/gender';
import { ENUMS_USER_ROLE } from '../../../enum/enum';

const createSuperAdmin = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required!' })
      .email({ message: 'Invalid email!' }),
    password: z.string({ required_error: 'Password is required!' }),
    superAdmin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required!',
        }),
        lastName: z.string({
          required_error: 'Last name is required!',
        }),
      }),
      contactNo: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

const createAdmin = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required!' })
      .email({ message: 'Invalid email!' }),
    password: z.string({ required_error: 'Password is required!' }),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required!',
        }),
        lastName: z.string({
          required_error: 'Last name is required!',
        }),
      }),
      gender: z.enum([...genders] as [string, ...string[]]).optional(),
      contactNo: z.string().optional(),
      dob: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

const createUser = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required!' })
      .email({ message: 'Invalid email!' }),
    password: z.string({ required_error: 'Password is required!' }),
    user: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required!',
        }),
        lastName: z.string({
          required_error: 'Last name is required!',
        }),
      }),
      contactNo: z.string({
        required_error: 'Contact No is required!',
      }),
      gender: z.enum([...genders] as [string, ...string[]]).optional(),
      dob: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

const updateUserRole = z.object({
  body: z.object({
    role: z.enum(
      [ENUMS_USER_ROLE.ADMIN, ENUMS_USER_ROLE.USER] as [string, ...string[]],
      {
        required_error: 'Role is required!',
      }
    ),
  }),
});

export const AllUsersValidation = {
  createSuperAdmin,
  createAdmin,
  createUser,
  updateUserRole,
};
