import { z } from 'zod';
import { isValid } from 'date-fns';

const isValidISO8601Date = (dateString: string) => {
  return isValid(new Date(dateString));
};
const iso8601Date = z.string().refine((date) => isValidISO8601Date(date), {
  message: 'Invalid ISO 8601 date format',
});

const createBooking = z.object({
  body: z
    .object({
      service: z.string({ required_error: 'Service ID is required' }),
      checkIn: iso8601Date,
      checkOut: iso8601Date,
      totalPerson: z
        .number({ required_error: 'Total person is required!' })
        .positive(),
      customer: z.object(
        {
          name: z.string({ required_error: 'Name is required!' }),
          contactNo: z.string({ required_error: 'Contact No is required!' }),
        },
        { required_error: 'Customer is required!' }
      ),
    })
    .refine(
      ({ checkIn, checkOut }) => {
        return new Date(checkIn) < new Date(checkOut);
      },
      {
        message: 'Check in date must be before the check out date',
      }
    ),
});

const adjustSchedules = z.object({
  body: z
    .object({
      checkIn: iso8601Date,
      checkOut: iso8601Date,
    })
    .refine(
      ({ checkIn, checkOut }) => {
        return new Date(checkIn) < new Date(checkOut);
      },
      {
        message: 'Check in date must be before the check out date',
      }
    ),
});

export const BookingValidation = {
  createBooking,
  adjustSchedules,
};
