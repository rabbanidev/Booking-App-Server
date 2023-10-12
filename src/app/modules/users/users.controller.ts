import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AllUsersService } from './users.service';
import sendResponse from '../../../shared/sendResponse';

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const { superAdmin, ...userData } = req.body;
  const result = await AllUsersService.createSuperAdmin(superAdmin, userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Super Admin successfully created!',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await AllUsersService.createAdmin(admin, userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin successfully created!',
    data: result,
  });
});

export const AllUsersController = {
  createSuperAdmin,
  createAdmin,
};
