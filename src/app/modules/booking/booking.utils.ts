import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IService } from '../service/service.interface';
import Service from '../service/service.model';

export const exitService = async (id: string): Promise<IService | null> => {
  const service = await Service.findById(id, { maxSize: 1 }).lean();
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  return service;
};
