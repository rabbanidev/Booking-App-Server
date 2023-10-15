import { z } from 'zod';
import { genders } from '../../../constants/gender';

const login = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email({ message: 'Invalid email address!' }),
    password: z.string({
      required_error: 'Password is required!',
    }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const register = z.object({
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

export const AuthValidation = {
  login,
  refreshToken,
  register,
};
