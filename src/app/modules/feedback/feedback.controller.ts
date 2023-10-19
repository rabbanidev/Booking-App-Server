import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { FeedBackService } from './feedback.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createFeedBack = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedBackService.createFeedBack(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Feedback created successfully!!',
    data: result,
  });
});

const getFeedBacks = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FeedBackService.getFeedBacks(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedbacks fetched successfully!!',
    data: result,
  });
});

export const FeedBackController = {
  createFeedBack,
  getFeedBacks,
};
