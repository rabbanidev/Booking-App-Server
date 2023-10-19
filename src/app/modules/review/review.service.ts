import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import Service from '../service/service.model';
import { IReview } from './review.interface';
import { Review } from './review.model';
import mongoose from 'mongoose';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helper/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';

const createReview = async (
  authUserId: string,
  payload: IReview
): Promise<IReview | null> => {
  const exitService = await Service.findById(payload.service);

  if (!exitService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const exitReview = await Review.findOne({
    service: payload.service,
    user: authUserId,
  });

  if (exitReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already reviewed!');
  }

  let numOfReviews = exitService?.numOfReviews ? exitService.numOfReviews : 0;
  numOfReviews = numOfReviews + 1;

  let rating: string | number = exitService?.rating ? exitService.rating : 0;
  rating = ((rating + payload.rating) / numOfReviews).toFixed(2);
  rating = Number(rating);

  let result = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateService = await Service.findByIdAndUpdate(
      payload.service,
      {
        numOfReviews,
        rating,
      },
      { new: true, session }
    );

    if (!updateService) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update service!');
    }

    const createReviews = await Review.create(
      [{ ...payload, user: authUserId }],
      { session }
    );
    if (!createReviews.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create reviewed!');
    }

    result = createReviews[0];

    // Commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (result) {
    result = await Review.findOne({
      service: result.service,
      user: result.user,
    }).populate(['user', 'service']);

    return result;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create reviewed!');
};

const getReviewsByService = async (serviceId: string): Promise<IReview[]> => {
  const result = await Review.find({
    service: serviceId,
  }).populate([
    {
      path: 'user',
      populate: {
        path: 'user',
      },
    },
    // {
    //   path: 'service',
    // },
  ]);

  return result;
};

const getReviews = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReview[]>> => {
  // pagination options
  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await Review.find()
    .populate([
      {
        path: 'user',
        populate: {
          path: 'user',
        },
      },
      {
        path: 'service',
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //   total documents
  const total = await Service.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ReviewService = {
  createReview,
  getReviewsByService,
  getReviews,
};
