import { z } from 'zod';

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

export const AuthValidation = {
  login,
  refreshToken,
};
