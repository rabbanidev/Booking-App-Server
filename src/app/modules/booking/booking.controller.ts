import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookingService } from './booking.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking successfully created!',
    data: result,
  });
});

export const BookingController = {
  createBooking,
};
