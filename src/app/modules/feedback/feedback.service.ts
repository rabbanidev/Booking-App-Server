import { paginationHelpers } from '../../../helper/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IFeedBack } from './feedback.interface';
import { FeedBack } from './feedback.model';

const createFeedBack = async (
  payload: IFeedBack
): Promise<IFeedBack | null> => {
  const result = await FeedBack.create(payload);
  return result;
};

const getFeedBacks = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFeedBack[]>> => {
  // pagination options
  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await FeedBack.find();
  //   total documents
  const total = await FeedBack.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const FeedBackService = {
  createFeedBack,
  getFeedBacks,
};
