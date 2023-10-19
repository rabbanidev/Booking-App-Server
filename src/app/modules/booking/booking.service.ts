import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBooking } from './booking.interface';
import { exitService } from './booking.utils';
import { Booking } from './booking.model';
import moment from 'moment';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helper/paginationHelpers';

const createBooking = async (authUserId: string, payload: IBooking) => {
  const service = await exitService(String(payload.service));

  if (service && service?.maxSize < payload.totalPerson) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Max size overloaded!');
  }

  const createObj = { ...payload, user: authUserId };
  const result = await Booking.create(createObj);
  return result;
};

const cancelBooking = async (
  authUserId: string,
  bookingId: string
): Promise<IBooking | null> => {
  const exitBooking = await Booking.findOne({
    _id: bookingId,
    user: authUserId,
  });

  if (!exitBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found!');
  }

  if (exitBooking.status === 'cancelled') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already boking cancelled!');
  }

  const today = moment(new Date());
  const bookingLastDay = moment(exitBooking.checkOut);

  if (!bookingLastDay.isAfter(today)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Date is or today. You can't cancel this booking!"
    );
  }

  exitBooking.status = 'cancelled';

  await exitBooking.save();

  return exitBooking;
};

const getMyBookings = async (
  authUserId: string,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
  // pagination options
  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await Booking.find({ user: authUserId })
    .populate([
      {
        path: 'user',
        populate: {
          path: 'user',
        },
      },
      {
        path: 'service',
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //   total documents
  const total = await Booking.countDocuments({ user: authUserId });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookingService = {
  createBooking,
  cancelBooking,
  getMyBookings,
};
