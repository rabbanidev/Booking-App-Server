import { paginationHelpers } from '../../../helper/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IFAQ } from './FAQ.interface';
import { FAQ } from './FAQ.model';

const createFAQ = async (payload: IFAQ): Promise<IFAQ | null> => {
  const result = await FAQ.create(payload);
  return result;
};

const updateFAQ = async (
  id: string,
  payload: Partial<IFAQ>
): Promise<IFAQ | null> => {
  const result = await FAQ.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteFAQ = async (id: string): Promise<IFAQ | null> => {
  const result = await FAQ.findByIdAndDelete(id);
  return result;
};

const getFAQs = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFAQ[]>> => {
  // pagination options
  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await FAQ.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //   total documents
  const total = await FAQ.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getFAQ = async (id: string): Promise<IFAQ | null> => {
  const result = await FAQ.findById(id);
  return result;
};

export const FAQService = {
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQs,
  getFAQ,
};
