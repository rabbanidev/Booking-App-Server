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

  const exitingBooking = await Booking.find({
    service: payload.service,
    checkOut: { $gte: new Date(payload.checkIn).toISOString() },
  });

  // console.log(new Date(payload.checkIn).toISOString());
  // console.log(exitingBooking);

  if (exitingBooking.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already booked this service.');
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

const getBokings = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
  // pagination options
  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await Booking.find({})
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
  const total = await Booking.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const acceptBooking = async (bookingId: string): Promise<IBooking | null> => {
  const exitBooking = await Booking.findById(bookingId);

  if (!exitBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found!');
  }

  if (exitBooking.status === 'cancelled') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already boking cancelled!');
  }

  exitBooking.status = 'accepted';

  await exitBooking.save();

  return exitBooking;
};

const rejectedBooking = async (bookingId: string): Promise<IBooking | null> => {
  const exitBooking = await Booking.findById(bookingId);

  if (!exitBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found!');
  }

  exitBooking.status = 'rejected';

  await exitBooking.save();

  return exitBooking;
};

const adjustSchedules = async (
  bookingId: string,
  payload: { checkIn: Date; checkOut: Date }
): Promise<IBooking | null> => {
  const exitBooking = await Booking.findById(bookingId);

  if (!exitBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found!');
  }
  if (exitBooking.status === 'cancelled') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already boking cancelled!');
  }
  // if (exitBooking.status === 'rejected') {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Already boking rejected!');
  // }

  exitBooking.checkIn = payload.checkIn;
  exitBooking.checkOut = payload.checkOut;
  exitBooking.status = 'adjust schedule';

  await exitBooking.save();

  return exitBooking;
};

const getBooking = async (bookingId: string): Promise<IBooking | null> => {
  const result = await Booking.findById(bookingId);

  return result;
};

export const BookingService = {
  createBooking,
  cancelBooking,
  getMyBookings,
  getBokings,
  acceptBooking,
  rejectedBooking,
  adjustSchedules,
  getBooking,
};
