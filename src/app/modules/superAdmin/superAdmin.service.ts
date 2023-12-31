import mongoose from 'mongoose';
import { ISuperAdmin } from './superAdmin.interface';
import AllUser from '../users/users.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import SuperAdmin from './superAdmin.model';

const updateProfile = async (
  authUserId: string,
  payload: Partial<ISuperAdmin>
): Promise<ISuperAdmin | null> => {
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
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update profile!');
    }

    // Update Super Admin Model
    const updateSuperAdmin = await SuperAdmin.findByIdAndUpdate(
      updatedUser.superAdmin,
      { $set: payload },
      { new: true, session }
    );
    if (!updateSuperAdmin?._id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update profile!');
    }

    result = updateSuperAdmin;

    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (result) {
    result = await SuperAdmin.findById(result.id);
  }

  return result;
};

export const SuperAdminService = {
  updateProfile,
};
