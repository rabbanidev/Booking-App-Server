import { z } from 'zod';
import { genders } from '../../../constants/gender';

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

export const AllUsersValidation = {
  createSuperAdmin,
  createAdmin,
};
