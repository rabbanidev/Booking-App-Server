import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserManagementService } from './userManagment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserManagementService.updateUser(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User successfully updated!',
    data: result,
  });
});

const manageUserAccount = catchAsync(async (req: Request, res: Response) => {
  const result = await UserManagementService.manageUserAccount(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User account managed successfully!',
    data: result,
  });
});

export const UserManagementController = {
  updateUser,
  manageUserAccount,
};
