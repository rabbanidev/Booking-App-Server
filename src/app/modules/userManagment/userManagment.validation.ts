import { z } from 'zod';
import { genders } from '../../../constants/gender';

const updateUser = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email!' }).optional(),
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    contactNo: z.string().optional(),
    gender: z.enum([...genders] as [string, ...string[]]).optional(),
    dob: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const UserManagmentValidation = {
  updateUser,
};
