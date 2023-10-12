import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const { superAdmin, ...userData } = req.body;
  const result = await UserService.createSuperAdmin(superAdmin, userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Super Admin successfully created!',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(admin, userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin successfully created!',
    data: result,
  });
});

export const UserController = {
  createSuperAdmin,
  createAdmin,
};
