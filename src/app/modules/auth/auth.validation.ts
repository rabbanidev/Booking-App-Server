import { z } from 'zod';

const login = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required!',
      invalid_type_error: 'Invalid ID!',
    }),
    password: z.string({
      required_error: 'Password is required!',
      invalid_type_error: 'Invalid password!',
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
