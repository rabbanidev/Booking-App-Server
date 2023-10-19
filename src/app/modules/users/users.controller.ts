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

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user, ...othersData } = req.body;
  const result = await AllUsersService.createUser(user, othersData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User successfully created!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AllUsersService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users successfully fetched!',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const result = await AllUsersService.updateUserRole(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role successfully updated!',
    data: result,
  });
});

const myInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await AllUsersService.myInfo(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My info fetched successfully!',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AllUsersService.updateMyProfile(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully!',
    data: result,
  });
});

export const AllUsersController = {
  createSuperAdmin,
  createAdmin,
  createUser,
  getAllUsers,
  updateUserRole,
  myInfo,
  updateMyProfile,
};
