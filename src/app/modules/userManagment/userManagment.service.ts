import mongoose from 'mongoose';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import AllUser from '../users/users.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const exitUser = await User.findById(id);
  if (!exitUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  let result = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Update user (AllUser Model or Main user)
    const updatedMainUser = await AllUser.findOneAndUpdate(
      { user: id },
      { $set: { email: payload.email } },
      { new: true, session }
    );

    if (!updatedMainUser) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update user!'
      );
    }

    // Update user (User Model)
    const updatedUser = await User.findByIdAndUpdate(id, payload, {
      new: true,
      session,
    });

    if (!updatedUser) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update user!'
      );
    }

    // Set updated user in result variable
    result = updatedUser;

    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return result;
};

const manageUserAccount = async (id: string): Promise<IUser | null> => {
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

export const UserManagementService = {
  updateUser,
  manageUserAccount,
};
