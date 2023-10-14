import { paginationHelpers } from '../../../helper/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { serviceSearchableFields } from './serviceManagment.constant';
import { IService, IServiceFilters } from './serviceManagment.interface';
import Service from './serviceManagment.model';

const createService = async (payload: IService): Promise<IService | null> => {
  const {
    name,
    category,
    location,
    price,
    maxSize,
    description,
    image,
    isUpcoming,
    facilities,
  } = payload;
  const createObj: Partial<IService> = {
    name,
    category,
    location,
    price,
    maxSize,
    description,
    image,
  };

  if (facilities) {
    createObj.facilities = facilities;
  }
  if (isUpcoming) {
    createObj.isUpcoming = true;
  }

  const result = await Service.create(payload);
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteService = async (id: string): Promise<IService | null> => {
  const result = await Service.findByIdAndDelete(id);
  return result;
};

const getServices = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IService[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  // Search implementation
  if (searchTerm) {
    andConditions.push({
      $or: serviceSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // min and max price implemenation
  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        $gte: minPrice || 0,
        $lte: maxPrice || Infinity,
      },
    });
  }

  // Filters implementation
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination options
  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //   total documents
  const total = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getService = async (id: string): Promise<IService | null> => {
  const result = await Service.findById(id);
  return result;
};

export const ServiceManagmentService = {
  createService,
  updateService,
  deleteService,
  getServices,
  getService,
};
