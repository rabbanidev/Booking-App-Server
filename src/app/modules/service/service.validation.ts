import { z } from 'zod';

const createService = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Service name is required!',
    }),
    category: z.string({
      required_error: 'Category is required!',
    }),
    location: z.string({
      required_error: 'Location is required!',
    }),
    price: z
      .number({
        required_error: 'Price is required!',
      })
      .positive(),
    maxSize: z
      .number({
        required_error: 'Max size is required!',
      })
      .positive(),
    description: z.string({
      required_error: 'Description is required!',
    }),
    image: z.string({
      required_error: 'Image is required!',
    }),
    isUpcoming: z.boolean().optional(),
    facilities: z.array(z.string()).optional(),
  }),
});

const updateService = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    location: z.string().optional(),
    price: z.number().positive().optional(),
    maxSize: z.number().positive().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    isUpcoming: z.boolean().optional(),
    facilities: z.array(z.string()).optional(),
  }),
});

export const ServiceManagmentValidation = {
  createService,
  updateService,
};
