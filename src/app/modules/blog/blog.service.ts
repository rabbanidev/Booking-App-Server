import { paginationHelpers } from '../../../helper/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: IBlog): Promise<IBlog | null> => {
  const result = await Blog.create(payload);
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getBlogs = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBlog[]>> => {
  // pagination options
  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await Blog.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //   total documents
  const total = await Blog.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById(id);
  return result;
};

export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlog,
};
