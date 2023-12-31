import { z } from 'zod';

const createFAQ = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
  }),
});

const updateFAQ = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const FAQValidation = {
  createFAQ,
  updateFAQ,
};
