import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import AllUser from '../users/users.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const user = new AllUser(); // instance method

  // Check user is exit
  const userExit = await user.userExit(email);

  if (!userExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found!');
  }

  // Match Password
  const isMatchedPassword =
    userExit?.password &&
    (await user.matchPassword(password, userExit.password));

  if (!isMatchedPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not matched!');
  }

  //   Generate access token & refresh token
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { _id: userId, role } = userExit;

  const accessToken = jwtHelpers.generateToken(
    {
      userId,
      role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      userId,
      role,
    },
    config.jwt.refress_secret as Secret,
    config.jwt.refress_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (
  payload: string
): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      payload,
      config.jwt.refress_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token!');
  }

  // Check user exit in database
  const { userId } = verifyToken as JwtPayload;
  const user = new AllUser();
  const userExit = await user.userExit(userId);

  if (!userExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  //  Generate a new access token
  const newAccessToken = jwtHelpers.generateToken(
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userId: userExit._id,
      role: userExit.role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  login,
  refreshToken,
};
