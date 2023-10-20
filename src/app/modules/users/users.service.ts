import mongoose from 'mongoose';
import { ISuperAdmin } from '../superAdmin/superAdmin.interface';
import { IAllUser, IUserResponse } from './users.interface';
import SuperAdmin from '../superAdmin/superAdmin.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import AllUser from './users.model';
import { IAdmin } from '../admin/admin.interface';
import Admin from '../admin/admin.model';
import User from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import { checkActiveUser, exitUserInfo } from './users.utils';

const createSuperAdmin = async (
  superAdmin: ISuperAdmin,
  userData: IAllUser
): Promise<IAllUser | null> => {
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Create super admin
    const superAdminPayload = {
      ...superAdmin,
      email: userData.email,
    };
    const newSuperAdmin = await SuperAdmin.create([superAdminPayload], {
      session,
    });
    if (!newSuperAdmin.length) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create super admin!'
      );
    }
    // Create a new user
    const userPayload = {
      ...userData,
      role: ENUMS_USER_ROLE.SUPER_ADMIN,
      superAdmin: newSuperAdmin[0]._id,
    };
    const newUser = await AllUser.create([userPayload], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserAllData = newUser[0];
    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  // Populate all fields
  if (newUserAllData) {
    newUserAllData = await AllUser.findOne({
      email: newUserAllData.email,
    }).populate({
      path: 'superAdmin',
    });
  }
  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  userData: IAllUser
): Promise<IAllUser | null> => {
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Create super admin
    const adminPayload = {
      ...admin,
      email: userData.email,
    };
    const newAdmin = await Admin.create([adminPayload], {
      session,
    });
    if (!newAdmin.length) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create admin!'
      );
    }
    // Create a new user
    const userPayload = {
      ...userData,
      role: ENUMS_USER_ROLE.ADMIN,
      admin: newAdmin[0]._id,
    };
    const newUser = await AllUser.create([userPayload], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserAllData = newUser[0];
    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  // Populate all fields
  if (newUserAllData) {
    newUserAllData = await AllUser.findOne({
      email: newUserAllData.email,
    }).populate({
      path: 'admin',
    });
  }
  return newUserAllData;
};

const createUser = async (
  user: IUser,
  othersData: IAllUser
): Promise<IAllUser | null> => {
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Create user
    const userPayload = {
      ...user,
      email: othersData.email,
    };
    const newUser = await User.create([userPayload], {
      session,
    });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create user!'
      );
    }
    // Create a new user for all users model
    const mainUserPayload = {
      ...othersData,
      role: ENUMS_USER_ROLE.USER,
      user: newUser[0]._id,
    };
    const mainUserresult = await AllUser.create([mainUserPayload], { session });
    if (!mainUserresult.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserAllData = mainUserresult[0];
    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  // Populate all fields
  if (newUserAllData) {
    newUserAllData = await AllUser.findOne({
      email: newUserAllData.email,
    }).populate({
      path: 'user',
    });
  }
  return newUserAllData;
};

const getAllUsers = async (): Promise<IUserResponse[]> => {
  const result = await AllUser.find()
    .populate(['superAdmin', 'admin', 'user'])
    .sort({ createdAt: -1 });
  return result;
};

const updateUserRole = async (
  id: string,
  payload: {
    role: ENUMS_USER_ROLE;
  }
): Promise<IUserResponse | null> => {
  const { role } = payload;
  const result = await AllUser.findByIdAndUpdate(
    id,
    {
      $set: { role: role },
    },
    { new: true }
  );
  // .populate({
  //   path: role,
  // });

  return result;
};

const myInfo = async (authUser: JwtPayload): Promise<IAllUser | null> => {
  const result = await AllUser.findById(authUser.userId).populate(
    authUser.role === ENUMS_USER_ROLE.SUPER_ADMIN ? 'superAdmin' : authUser.role
  );
  return result;
};

const updateMyProfile = async (
  authUser: JwtPayload,
  payload: Partial<IAllUser>
) => {
  const exitUser = await exitUserInfo(authUser);
  if (authUser?.role === ENUMS_USER_ROLE.USER && exitUser.user) {
    checkActiveUser(exitUser.user as IUser);
  }

  let result = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    let updatedUser = null;
    if (authUser.role === ENUMS_USER_ROLE.USER) {
      updatedUser = await User.findByIdAndUpdate(exitUser.user, payload, {
        new: true,
        session,
      });
    } else if (authUser.role === ENUMS_USER_ROLE.ADMIN) {
      updatedUser = await Admin.findByIdAndUpdate(exitUser.admin, payload, {
        new: true,
        session,
      });
    } else {
      updatedUser = await SuperAdmin.findByIdAndUpdate(
        exitUser.superAdmin,
        payload,
        {
          new: true,
          session,
        }
      );
    }

    if (!updatedUser) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update user!'
      );
    }

    // Updated Main USer
    const updatedMainUser = await AllUser.findByIdAndUpdate(
      exitUser._id,
      { $set: { email: payload.email } },
      {
        new: true,
        session,
      }
    );

    if (!updatedMainUser) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update user!'
      );
    }

    // Set updated user in result variable
    result = updatedMainUser;

    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (result) {
    result = await AllUser.findOne({ email: result.email }).populate(
      result.role === ENUMS_USER_ROLE.SUPER_ADMIN ? 'superAdmin' : result.role
    );
  }

  return result;
};

const getAllNormalUsers = async (): Promise<IUserResponse[]> => {
  const result = await AllUser.find({ role: ENUMS_USER_ROLE.USER }).populate(
    ENUMS_USER_ROLE.USER
  );
  return result;
};

const updateUserByAuthority = async (
  userId: string,
  payload: Partial<IAllUser>
) => {
  const exitUser = await AllUser.findById(userId);
  if (!exitUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  let result = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    let updatedUser = null;
    if (exitUser.role === ENUMS_USER_ROLE.USER) {
      updatedUser = await User.findByIdAndUpdate(exitUser.user, payload, {
        new: true,
        session,
      });
    } else if (exitUser.role === ENUMS_USER_ROLE.ADMIN) {
      updatedUser = await Admin.findByIdAndUpdate(exitUser.user, payload, {
        new: true,
        session,
      });
    }

    if (!updatedUser) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update user!'
      );
    }

    // Updated Main USer
    const updatedMainUser = await AllUser.findByIdAndUpdate(
      exitUser._id,
      { $set: { email: payload.email } },
      {
        new: true,
        session,
      }
    );

    if (!updatedMainUser) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update user!'
      );
    }

    // Set updated user in result variable
    result = updatedMainUser;

    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (result) {
    result = await AllUser.findOne({ email: result.email }).populate('user');
  }

  return result;
};

const singleUser = async (id: string): Promise<IAllUser | null> => {
  const result = await AllUser.findById(id).populate([
    'admin',
    'superAdmin',
    'user',
  ]);
  return result;
};

const manageEnableUser = async (id: string): Promise<IUser | null> => {
  const exitUser = await User.findById(id, { active: 1 }).lean();

  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        active: !exitUser?.active,
      },
    },
    { new: true }
  );

  return result;
};

export const AllUsersService = {
  createSuperAdmin,
  createAdmin,
  createUser,
  getAllUsers,
  updateUserRole,
  myInfo,
  updateMyProfile,
  getAllNormalUsers,
  updateUserByAuthority,
  singleUser,
  manageEnableUser,
};
