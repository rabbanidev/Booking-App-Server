import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookingService } from './booking.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking successfully created!',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.cancelBooking(
    req.user.userId,
    req.params.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successfully cancelled!',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookingService.getMyBookings(
    req.user.userId,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Booking successfully fetched!',
    data: result,
  });
});

const getBokings = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookingService.getBokings(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successfully fetched!',
    data: result,
  });
});

const acceptBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.acceptBooking(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successfully accetpted!',
    data: result,
  });
});

const rejectedBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.rejectedBooking(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successfully rejected!',
    data: result,
  });
});

const adjustSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.adjustSchedules(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successfully adjust schedules!',
    data: result,
  });
});

const getBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getBooking(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successfully fetched schedules!',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  cancelBooking,
  getMyBookings,
  getBokings,
  acceptBooking,
  rejectedBooking,
  adjustSchedules,
  getBooking,
};
