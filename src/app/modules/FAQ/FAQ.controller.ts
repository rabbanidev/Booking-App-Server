import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { FAQService } from './FAQ.service';

const createFAQ = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.createFAQ(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'FAQ created successfully!',
    data: result,
  });
});

const updateFAQ = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.updateFAQ(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ updated successfully!',
    data: result,
  });
});

const deleteFAQ = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.deleteFAQ(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ deleted successfully!',
    data: result,
  });
});

const getFAQs = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FAQService.getFAQs(paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQs fetched successfully!',
    data: result,
  });
});

const getFAQ = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.getFAQ(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ fetched successfully!',
    data: result,
  });
});

export const FAQController = {
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQs,
  getFAQ,
};
