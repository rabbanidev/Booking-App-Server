import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { NewsService } from './news.service';

const createNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.createNews(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'News created successfully!',
    data: result,
  });
});

const updateNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.updateNews(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News updated successfully!',
    data: result,
  });
});

const deleteNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.deleteNews(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News deleted successfully!',
    data: result,
  });
});

const getNewses = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await NewsService.getNewses(paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Newses fetched successfully!',
    data: result,
  });
});

const getNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.getNews(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News fetched successfully!',
    data: result,
  });
});

export const NewsController = {
  createNews,
  updateNews,
  deleteNews,
  getNewses,
  getNews,
};
