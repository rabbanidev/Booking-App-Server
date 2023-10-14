import { paginationHelpers } from '../../../helper/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { INews } from './news.interface';
import { News } from './news.model';

const createNews = async (payload: INews): Promise<INews | null> => {
  const result = await News.create(payload);
  return result;
};

const updateNews = async (
  id: string,
  payload: Partial<INews>
): Promise<INews | null> => {
  const result = await News.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteNews = async (id: string): Promise<INews | null> => {
  const result = await News.findByIdAndDelete(id);
  return result;
};

const getNewses = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<INews[]>> => {
  // pagination options
  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await News.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //   total documents
  const total = await News.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getNews = async (id: string): Promise<INews | null> => {
  const result = await News.findById(id);
  return result;
};

export const NewsService = {
  createNews,
  updateNews,
  deleteNews,
  getNewses,
  getNews,
};
