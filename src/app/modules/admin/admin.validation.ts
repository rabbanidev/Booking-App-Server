import { z } from 'zod';
import { genders } from '../../../constants/gender';

const updateProfile = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    dob: z.string().optional(),
    gender: z.enum([...genders] as [string, ...string[]]).optional(),
    profileImage: z.string().optional(),
  }),
});

export const AdminValidation = {
  updateProfile,
};
