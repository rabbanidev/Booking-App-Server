import { z } from 'zod';

const createFeedback = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email({ message: 'Invalid email!' }),
    description: z.string({
      required_error: 'Name is required!',
    }),
  }),
});

export const FeedbackValidation = {
  createFeedback,
};
