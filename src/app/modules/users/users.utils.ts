import { JwtPayload } from 'jsonwebtoken';
import AllUser from './users.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';

export const exitUserInfo = async (authUser: JwtPayload) => {
  const exitUser = await AllUser.findById(authUser.userId).populate(
    authUser.role
  );

  if (!exitUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  return exitUser;
};

export const checkActiveUser = (user: IUser): void => {
  if (!user.active) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Your are not active user!');
  }
};
