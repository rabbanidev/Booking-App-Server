import mongoose from 'mongoose';
import AllUser from '../users/users.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IAdmin } from './admin.interface';
import Admin from './admin.model';

const updateProfile = async (
  authUserId: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  let result = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Update (All User Model)
    const updatedUser = await AllUser.findByIdAndUpdate(
      authUserId,
      { $set: { email: payload.email } },
      { new: true, session }
    );
    if (!updatedUser?._id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to profile update!');
    }

    // Update Super Admin Model
    const updatedAdmin = await Admin.findByIdAndUpdate(
      updatedUser.admin,
      { $set: payload },
      { new: true, session }
    );
    if (!updatedAdmin?._id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to profile update!');
    }

    result = updatedAdmin;

    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (result) {
    result = await Admin.findById(result._id);
  }

  return result;
};

export const AdminService = {
  updateProfile,
};
