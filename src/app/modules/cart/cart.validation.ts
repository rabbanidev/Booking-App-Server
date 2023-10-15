import { z } from 'zod';

const addToCart = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'Service ID is required!',
    }),
  }),
});

export const CartValidation = {
  addToCart,
};
