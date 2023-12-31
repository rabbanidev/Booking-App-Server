import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { SuperAdminService } from './superAdmin.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await SuperAdminService.updateProfile(
    req.user.userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super Admin profile updated successfully!',
    data: result,
  });
});

export const SuperAdminController = {
  updateProfile,
};
