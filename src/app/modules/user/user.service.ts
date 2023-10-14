import mongoose from 'mongoose';
import AllUser from '../users/users.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import User from './user.model';

const updateProfile = async (
  authUserId: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  let result = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Update (All User Model)
    const updatedMainUser = await AllUser.findByIdAndUpdate(
      authUserId,
      { $set: { email: payload.email } },
      { new: true, session }
    );
    if (!updatedMainUser?._id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update profile!');
    }

    // Update Super Admin Model
    const updatedUser = await User.findByIdAndUpdate(
      updatedMainUser.user,
      { $set: { ...payload, active: true } },
      { new: true, session }
    );
    if (!updatedUser?._id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update profile!');
    }

    result = updatedUser;

    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (result) {
    result = await User.findById(result.id);
  }

  return result;
};

export const UserService = {
  updateProfile,
};
