import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ReviewService } from './review.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully reviewed!',
    data: result,
  });
});

const getReviewsByService = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviewsByService(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fteched successfully!!',
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ReviewService.getReviews(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fteched successfully!!',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReviewsByService,
  getReviews,
};
