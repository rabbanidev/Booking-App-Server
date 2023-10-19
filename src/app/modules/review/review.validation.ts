import { z } from 'zod';

const createReview = z.object({
  body: z.object({
    service: z.string({
      required_error: 'Service ID is required!',
    }),
    rating: z
      .number({ required_error: 'Rating is required!' })
      .positive({ message: 'Rating must be positive!' })
      .min(1)
      .max(5),
    description: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReview,
};
