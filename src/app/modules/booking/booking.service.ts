import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBooking } from './booking.interface';
import { exitService } from './booking.utils';
import { Booking } from './booking.model';

const createBooking = async (authUserId: string, payload: IBooking) => {
  const service = await exitService(String(payload.service));

  if (service && service?.maxSize < payload.totalPerson) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Max size overloaded!');
  }

  const createObj = { ...payload, user: authUserId };
  const result = await Booking.create(createObj);
  return result;
};

export const BookingService = {
  createBooking,
};
